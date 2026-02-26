import { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { getAllUsers } from '../src/database/db';

export default function AdminMembersScreen() {
    const [users, setUsers] = useState([]);
    const router = useRouter();

    useFocusEffect(useCallback(() => {
        setUsers(getAllUsers());
    }, []));

    const renderUser = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.avatar}>
                <Text style={styles.avatarText}>{item.username.charAt(0).toUpperCase()}</Text>
            </View>
            <View style={styles.info}>
                <Text style={styles.username}>{item.username}</Text>
                <Text style={styles.userId}>รหัส #{item.user_id}</Text>
            </View>
            <View style={[styles.badge, item.role === 'admin' ? styles.adminBadge : styles.memberBadge]}>
                <Text style={styles.badgeText}>{item.role === 'admin' ? '🔧 Admin' : '👤 Member'}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={styles.back}>← กลับ</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>👥 ข้อมูลสมาชิก</Text>
                <Text style={styles.count}>{users.length} คน</Text>
            </View>

            <FlatList
                data={users}
                keyExtractor={(item) => String(item.user_id)}
                renderItem={renderUser}
                contentContainerStyle={{ padding: 16 }}
                ListEmptyComponent={<Text style={styles.empty}>ยังไม่มีสมาชิก</Text>}
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
    headerTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
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
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#1565c0',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
    },
    avatarText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
    info: { flex: 1 },
    username: { fontSize: 16, fontWeight: '600', color: '#1a237e', marginBottom: 2 },
    userId: { fontSize: 12, color: '#9e9e9e' },
    badge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 },
    adminBadge: { backgroundColor: '#fce4ec' },
    memberBadge: { backgroundColor: '#e3f2fd' },
    badgeText: { fontSize: 12, fontWeight: '600' },
    empty: { textAlign: 'center', color: '#9e9e9e', marginTop: 60, fontSize: 16 },
});
