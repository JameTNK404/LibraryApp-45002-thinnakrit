import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.emoji}>📚</Text>
                <Text style={styles.title}>ระบบห้องสมุด</Text>
                <Text style={styles.subtitle}>Mobile Library Borrow-Return System</Text>
            </View>

            {/* Cards */}
            <View style={styles.cardContainer}>
                <TouchableOpacity
                    style={[styles.card, styles.memberCard]}
                    onPress={() => router.push('/login')}
                >
                    <Text style={styles.cardEmoji}>👤</Text>
                    <View style={styles.cardTextContainer}>
                        <Text style={styles.cardTitle}>สมาชิก</Text>
                        <Text style={styles.cardDesc}>เข้าสู่ระบบ / สมัครสมาชิก{'\n'}ยืม-คืนหนังสือ</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.card, styles.adminCard]}
                    onPress={() => router.push('/admin-login')}
                >
                    <Text style={styles.cardEmoji}>🛡️</Text>
                    <View style={styles.cardTextContainer}>
                        <Text style={[styles.cardTitle, styles.adminTitle]}>ผู้ดูแลระบบ</Text>
                        <Text style={[styles.cardDesc, styles.adminDesc]}>จัดการหนังสือ{'\n'}ดูข้อมูลสมาชิก</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    header: {
        alignItems: 'center',
        marginBottom: 48,
        width: '100%',
    },
    emoji: {
        fontSize: 72,
        marginBottom: 16,
    },
    title: {
        fontSize: 32,
        fontWeight: '900',
        color: '#0f172a',
        marginBottom: 8,
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 15,
        color: '#64748b',
        textAlign: 'center',
        fontWeight: '500',
    },
    cardContainer: {
        width: '100%',
        gap: 20,
    },
    card: {
        borderRadius: 24,
        padding: 28,
        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: '#475569',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.15,
        shadowRadius: 24,
        elevation: 8,
    },
    memberCard: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    adminCard: {
        backgroundColor: '#1e293b',
    },
    cardEmoji: {
        fontSize: 48,
        marginRight: 20,
    },
    cardTextContainer: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: '#0f172a',
        marginBottom: 6,
    },
    cardDesc: {
        fontSize: 14,
        color: '#64748b',
        lineHeight: 20,
    },
    adminTitle: {
        color: '#f8fafc',
    },
    adminDesc: {
        color: '#94a3b8',
    }
});
