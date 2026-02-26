import { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { getUserTransactions } from '../src/database/db';
import { useAuth } from '../src/context/AuthContext';

export default function HistoryScreen() {
    const [transactions, setTransactions] = useState([]);
    const router = useRouter();
    const { user } = useAuth();

    useFocusEffect(useCallback(() => {
        setTransactions(getUserTransactions(user.user_id));
    }, []));

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.row}>
                <Text style={styles.bookTitle}>{item.title}</Text>
                <View style={[styles.badge, item.status === 'borrowing' ? styles.borrowing : styles.returned]}>
                    <Text style={styles.badgeText}>
                        {item.status === 'borrowing' ? '📖 กำลังยืม' : '✅ คืนแล้ว'}
                    </Text>
                </View>
            </View>
            <Text style={styles.dateText}>
                ยืม: {new Date(item.borrow_date).toLocaleDateString('th-TH', {
                    year: 'numeric', month: 'short', day: 'numeric',
                })}
            </Text>
            {item.return_date && (
                <Text style={styles.dateText}>
                    คืน: {new Date(item.return_date).toLocaleDateString('th-TH', {
                        year: 'numeric', month: 'short', day: 'numeric',
                    })}
                </Text>
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={styles.back}>← กลับ</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>📋 ประวัติการทำรายการ</Text>
                <View style={{ width: 50 }} />
            </View>

            <FlatList
                data={transactions}
                keyExtractor={(item) => String(item.transaction_id)}
                renderItem={renderItem}
                contentContainerStyle={{ padding: 16 }}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyEmoji}>📭</Text>
                        <Text style={styles.empty}>ยังไม่มีประวัติการทำรายการ</Text>
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    header: {
        backgroundColor: '#1a237e',
        padding: 20,
        paddingTop: 56,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    back: { color: '#9fa8da', fontSize: 15 },
    headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    card: {
        backgroundColor: '#fff',
        borderRadius: 14,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 3,
    },
    row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
    bookTitle: { flex: 1, fontSize: 15, fontWeight: '600', color: '#1a237e', marginRight: 8 },
    badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
    borrowing: { backgroundColor: '#fff8e1' },
    returned: { backgroundColor: '#e8f5e9' },
    badgeText: { fontSize: 12, fontWeight: '600' },
    dateText: { fontSize: 12, color: '#757575', marginTop: 2 },
    emptyContainer: { alignItems: 'center', marginTop: 80 },
    emptyEmoji: { fontSize: 48, marginBottom: 12 },
    empty: { color: '#9e9e9e', fontSize: 16 },
});
