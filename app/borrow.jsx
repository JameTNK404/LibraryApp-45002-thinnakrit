import { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { getAllBooks, borrowBook } from '../src/database/db';
import { useAuth } from '../src/context/AuthContext';

export default function BorrowScreen() {
    const [books, setBooks] = useState([]);
    const router = useRouter();
    const { user } = useAuth();

    useFocusEffect(useCallback(() => {
        setBooks(getAllBooks());
    }, []));

    const handleBorrow = (book) => {
        if (book.status !== 'available') {
            Alert.alert('ไม่สามารถยืมได้', 'หนังสือเล่มนี้ถูกยืมไปแล้ว กรุณาเลือกเล่มอื่น');
            return;
        }
        Alert.alert(
            'ยืนยันการยืม',
            `ต้องการยืม "${book.title}" ใช่ไหม?`,
            [
                { text: 'ยกเลิก', style: 'cancel' },
                {
                    text: 'ยืนยัน',
                    onPress: () => {
                        const result = borrowBook(user.user_id, book.book_id);
                        if (result.success) {
                            Alert.alert('สำเร็จ', 'ยืมหนังสือเรียบร้อยแล้ว');
                            setBooks(getAllBooks());
                        } else {
                            Alert.alert('ข้อผิดพลาด', result.error);
                        }
                    },
                },
            ]
        );
    };

    const renderBook = ({ item }) => (
        <View style={styles.bookCard}>
            <View style={styles.bookInfo}>
                <Text style={styles.bookTitle}>{item.title}</Text>
                <View style={[styles.badge, item.status === 'available' ? styles.available : styles.borrowed]}>
                    <Text style={styles.badgeText}>
                        {item.status === 'available' ? '✅ ว่าง' : '🔴 ถูกยืมแล้ว'}
                    </Text>
                </View>
            </View>
            <TouchableOpacity
                style={[styles.borrowBtn, item.status !== 'available' && styles.borrowBtnDisabled]}
                onPress={() => handleBorrow(item)}
                disabled={item.status !== 'available'}
            >
                <Text style={styles.borrowBtnText}>ยืม</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={styles.back}>← กลับ</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>📖 ยืมหนังสือ</Text>
                <View style={{ width: 50 }} />
            </View>

            <FlatList
                data={books}
                keyExtractor={(item) => String(item.book_id)}
                renderItem={renderBook}
                contentContainerStyle={{ padding: 16 }}
                ListEmptyComponent={<Text style={styles.empty}>ไม่มีหนังสือในระบบ</Text>}
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
    bookCard: {
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
    bookInfo: { flex: 1, marginRight: 12 },
    bookTitle: { fontSize: 16, fontWeight: '600', color: '#1a237e', marginBottom: 8 },
    badge: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
    available: { backgroundColor: '#e8f5e9' },
    borrowed: { backgroundColor: '#ffebee' },
    badgeText: { fontSize: 12, fontWeight: '600' },
    borrowBtn: {
        backgroundColor: '#3949ab',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
    },
    borrowBtnDisabled: { backgroundColor: '#bdbdbd' },
    borrowBtnText: { color: '#fff', fontWeight: 'bold' },
    empty: { textAlign: 'center', color: '#9e9e9e', marginTop: 60, fontSize: 16 },
});
