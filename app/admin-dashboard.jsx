import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../src/context/AuthContext';

export default function AdminDashboard() {
    const router = useRouter();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        router.replace('/');
    };

    const menus = [
        { emoji: '👥', title: 'ข้อมูลสมาชิก', desc: 'ดูรายชื่อสมาชิกทั้งหมด', route: '/admin-members' },
        { emoji: '➕', title: 'เพิ่มหนังสือ', desc: 'เพิ่มหนังสือใหม่เข้าระบบ', route: '/admin-add-book' },
        { emoji: '📚', title: 'หนังสือที่ถูกยืม', desc: 'ดูรายการหนังสือที่ถูกยืม', route: '/admin-borrowed' },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleLogout} style={styles.backBtn}>
                    <Text style={styles.backText}>← กลับไปหน้าแรก</Text>
                </TouchableOpacity>
                <View style={styles.headerContent}>
                    <Text style={styles.greeting}>👋 สวัสดี, {user?.username}</Text>
                    <Text style={styles.headerTitle}>Admin Dashboard</Text>
                </View>
            </View>

            <View style={styles.content}>
                {menus.map((m) => (
                    <TouchableOpacity key={m.route} style={styles.menuCard} onPress={() => router.push(m.route)}>
                        <Text style={styles.menuEmoji}>{m.emoji}</Text>
                        <View style={styles.menuInfo}>
                            <Text style={styles.menuTitle}>{m.title}</Text>
                            <Text style={styles.menuDesc}>{m.desc}</Text>
                        </View>
                        <Text style={styles.arrow}>›</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    header: {
        backgroundColor: '#0d47a1',
        padding: 24,
        paddingTop: 60,
    },
    backBtn: { marginBottom: 16 },
    backText: { color: '#90caf9', fontSize: 15, fontWeight: '600' },
    headerContent: { alignItems: 'flex-start' },
    greeting: { color: '#e3f2fd', fontSize: 16, marginBottom: 4 },
    headerTitle: { color: '#fff', fontSize: 26, fontWeight: 'bold' },
    content: { padding: 16, marginTop: 8 },
    menuCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 14,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 4,
    },
    menuEmoji: { fontSize: 36, marginRight: 16 },
    menuInfo: { flex: 1 },
    menuTitle: { fontSize: 18, fontWeight: '700', color: '#0d47a1', marginBottom: 4 },
    menuDesc: { fontSize: 13, color: '#757575' },
    arrow: { fontSize: 28, color: '#bdbdbd', fontWeight: '300' },
});
