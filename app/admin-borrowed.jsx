import { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { getAllBorrowedBooks } from '../src/database/db';

export default function AdminBorrowedScreen() {
    const [borrowed, setBorrowed] = useState([]);
    const router = useRouter();

    useFocusEffect(useCallback(() => {
        setBorrowed(getAllBorrowedBooks());
    }, []));

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.bookIcon}>
                <Text style={styles.bookEmoji}>📕</Text>
            </View>
            <View style={styles.info}>
                <Text style={styles.bookTitle}>{item.title}</Text>
                <Text style={styles.borrower}>👤 {item.username}</Text>
                <Text style={styles.date}>
                    ยืมเมื่อ: {new Date(item.borrow_date).toLocaleDateString('th-TH', {
                        year: 'numeric', month: 'short', day: 'numeric',
                    })}
                </Text>
            </View>
            <View style={styles.badge}>
                <Text style={styles.badgeText}>🔴 ถูกยืม</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={styles.back}>← กลับ</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>📚 หนังสือที่ถูกยืม</Text>
                <Text style={styles.count}>{borrowed.length} เล่ม</Text>
            </View>

            <FlatList
                data={borrowed}
                keyExtractor={(item) => String(item.transaction_id)}
                renderItem={renderItem}
                contentContainerStyle={{ padding: 16 }}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyEmoji}>🎉</Text>
                        <Text style={styles.empty}>ไม่มีหนังสือที่ถูกยืมอยู่ในขณะนี้</Text>
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    header: {
        backgroundColor: '#0d47a1',
        padding: 20,
        paddingTop: 56,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    back: { color: '#90caf9', fontSize: 15 },
    headerTitle: { color: '#fff', fontSize: 19, fontWeight: 'bold' },
    count: { color: '#90caf9', fontSize: 14 },
    card: {
        backgroundColor: '#fff',
        borderRadius: 14,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 3,
    },
    bookIcon: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: '#ffebee',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
    },
    bookEmoji: { fontSize: 24 },
    info: { flex: 1 },
    bookTitle: { fontSize: 15, fontWeight: '600', color: '#0d47a1', marginBottom: 3 },
    borrower: { fontSize: 13, color: '#424242', marginBottom: 2 },
    date: { fontSize: 12, color: '#9e9e9e' },
    badge: { backgroundColor: '#ffebee', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 },
    badgeText: { fontSize: 12, fontWeight: '600', color: '#c62828' },
    emptyContainer: { alignItems: 'center', marginTop: 80 },
    emptyEmoji: { fontSize: 48, marginBottom: 12 },
    empty: { color: '#9e9e9e', fontSize: 16 },
});
