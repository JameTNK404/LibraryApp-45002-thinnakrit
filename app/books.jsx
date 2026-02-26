import { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { getAllBooks } from '../src/database/db';
import { useAuth } from '../src/context/AuthContext';

export default function BooksScreen() {
    const [books, setBooks] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const router = useRouter();
    const { user, logout } = useAuth();

    const loadBooks = () => {
        setBooks(getAllBooks());
    };

    // Reload every time screen comes into focus
    useFocusEffect(useCallback(() => { loadBooks(); }, []));

    const onRefresh = () => {
        setRefreshing(true);
        loadBooks();
        setRefreshing(false);
    };

    const handleLogout = () => {
        logout();
        router.replace('/');
    };

    const renderBook = ({ item }) => (
        <View style={styles.bookCard}>
            <View style={styles.bookInfo}>
                <Text style={styles.bookTitle}>{item.title}</Text>
                <Text style={styles.bookId}>รหัส #{item.book_id}</Text>
            </View>
            <View style={[styles.badge, item.status === 'available' ? styles.available : styles.borrowed]}>
                <Text style={styles.badgeText}>
                    {item.status === 'available' ? '✅ ว่าง' : '🔴 ถูกยืมแล้ว'}
                </Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={handleLogout} style={styles.backBtn}>
                    <Text style={styles.backText}>← กลับไปหน้าแรก</Text>
                </TouchableOpacity>
                <View style={styles.headerContent}>
                    <Text style={styles.greeting}>สวัสดี, {user?.username} 👋</Text>
                    <Text style={styles.headerTitle}>รายการหนังสือทั้งหมด</Text>
                </View>
            </View>

            <FlatList
                data={books}
                keyExtractor={(item) => String(item.book_id)}
                renderItem={renderBook}
                contentContainerStyle={{ padding: 16 }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                ListEmptyComponent={<Text style={styles.empty}>ยังไม่มีหนังสือในระบบ</Text>}
            />

            {/* Menu Buttons */}
            <View style={styles.menu}>
                <TouchableOpacity style={styles.menuBtn} onPress={() => router.push('/borrow')}>
                    <Text style={styles.menuEmoji}>📖</Text>
                    <Text style={styles.menuText}>ยืมหนังสือ</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuBtn} onPress={() => router.push('/return')}>
                    <Text style={styles.menuEmoji}>↩️</Text>
                    <Text style={styles.menuText}>คืนหนังสือ</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuBtn} onPress={() => router.push('/history')}>
                    <Text style={styles.menuEmoji}>📋</Text>
                    <Text style={styles.menuText}>ประวัติ</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    header: {
        backgroundColor: '#1a237e',
        padding: 24,
        paddingTop: 60,
    },
    backBtn: { marginBottom: 16 },
    backText: { color: '#9fa8da', fontSize: 15, fontWeight: '600' },
    headerContent: { alignItems: 'flex-start' },
    greeting: { color: '#c5cae9', fontSize: 16, marginBottom: 4 },
    headerTitle: { color: '#fff', fontSize: 26, fontWeight: 'bold' },
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
    bookTitle: { fontSize: 16, fontWeight: '600', color: '#1a237e', marginBottom: 4 },
    bookId: { fontSize: 12, color: '#9e9e9e' },
    badge: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20 },
    available: { backgroundColor: '#e8f5e9' },
    borrowed: { backgroundColor: '#ffebee' },
    badgeText: { fontSize: 12, fontWeight: '600' },
    empty: { textAlign: 'center', color: '#9e9e9e', marginTop: 60, fontSize: 16 },
    menu: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        paddingBottom: 24,
    },
    menuBtn: { flex: 1, alignItems: 'center', paddingVertical: 12 },
    menuEmoji: { fontSize: 24, marginBottom: 4 },
    menuText: { fontSize: 12, color: '#3949ab', fontWeight: '500' },
});
