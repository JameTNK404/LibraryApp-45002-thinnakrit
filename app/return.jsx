import { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { getBorrowingByUser, returnBook } from '../src/database/db';
import { useAuth } from '../src/context/AuthContext';

export default function ReturnScreen() {
    const [borrowing, setBorrowing] = useState([]);
    const router = useRouter();
    const { user } = useAuth();

    useFocusEffect(useCallback(() => {
        setBorrowing(getBorrowingByUser(user.user_id));
    }, []));

    const handleReturn = (item) => {
        Alert.alert(
            'ยืนยันการคืน',
            `ต้องการคืน "${item.title}" ใช่ไหม?`,
            [
                { text: 'ยกเลิก', style: 'cancel' },
                {
                    text: 'ยืนยัน',
                    onPress: () => {
                        returnBook(item.transaction_id, item.book_id);
                        Alert.alert('สำเร็จ', 'คืนหนังสือเรียบร้อยแล้ว');
                        setBorrowing(getBorrowingByUser(user.user_id));
                    },
                },
            ]
        );
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.info}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.date}>
                    ยืมเมื่อ: {new Date(item.borrow_date).toLocaleDateString('th-TH')}
                </Text>
            </View>
            <TouchableOpacity style={styles.returnBtn} onPress={() => handleReturn(item)}>
                <Text style={styles.returnBtnText}>คืน</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={styles.back}>← กลับ</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>↩️ คืนหนังสือ</Text>
                <View style={{ width: 50 }} />
            </View>

            <FlatList
                data={borrowing}
                keyExtractor={(item) => String(item.transaction_id)}
                renderItem={renderItem}
                contentContainerStyle={{ padding: 16 }}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyEmoji}>📭</Text>
                        <Text style={styles.empty}>คุณไม่มีหนังสือที่ยืมอยู่ในขณะนี้</Text>
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
    headerTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
    card: {
        backgroundColor: '#fff',
        borderRadius: 14,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 3,
    },
    info: { flex: 1, marginRight: 12 },
    title: { fontSize: 16, fontWeight: '600', color: '#1a237e', marginBottom: 4 },
    date: { fontSize: 12, color: '#9e9e9e' },
    returnBtn: {
        backgroundColor: '#e53935',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
    },
    returnBtnText: { color: '#fff', fontWeight: 'bold' },
    emptyContainer: { alignItems: 'center', marginTop: 80 },
    emptyEmoji: { fontSize: 48, marginBottom: 12 },
    empty: { color: '#9e9e9e', fontSize: 16 },
});
