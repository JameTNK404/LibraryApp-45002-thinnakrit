import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { loginUser } from '../src/database/db';
import { useAuth } from '../src/context/AuthContext';

export default function AdminLoginScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const { login } = useAuth();

    const handleLogin = () => {
        if (!username.trim() || !password.trim()) {
            Alert.alert('ข้อผิดพลาด', 'กรุณากรอกชื่อผู้ใช้และรหัสผ่านให้ครบ');
            return;
        }
        const user = loginUser(username.trim(), password.trim());
        if (!user) {
            Alert.alert('ข้อผิดพลาด', 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
            return;
        }
        if (user.role !== 'admin') {
            Alert.alert('ข้อผิดพลาด', 'บัญชีนี้ไม่มีสิทธิ์ผู้ดูแลระบบ');
            return;
        }
        login(user);
        router.replace('/admin-dashboard');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                <Text style={styles.backText}>← กลับ</Text>
            </TouchableOpacity>

            <View style={styles.card}>
                <Text style={styles.emoji}>🛡️</Text>
                <Text style={styles.title}>ผู้ดูแลระบบ</Text>
                <Text style={styles.subtitle}>กรุณาเข้าสู่ระบบเพื่อจัดการข้อมูล</Text>

                <TextInput
                    style={styles.input}
                    placeholder="ชื่อผู้ใช้ Admin"
                    placeholderTextColor="#9ca3af"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="รหัสผ่าน"
                    placeholderTextColor="#9ca3af"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TouchableOpacity style={styles.btn} onPress={handleLogin}>
                    <Text style={styles.btnText}>เข้าสู่ระบบ</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0f172a', padding: 24, justifyContent: 'center' },
    backBtn: { position: 'absolute', top: 56, left: 24, padding: 8 },
    backText: { color: '#94a3b8', fontSize: 16, fontWeight: '600' },
    card: {
        backgroundColor: '#1e293b',
        borderRadius: 24,
        padding: 32,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.4,
        shadowRadius: 16,
        elevation: 10,
        borderWidth: 1,
        borderColor: '#334155',
    },
    emoji: { fontSize: 56, marginBottom: 12 },
    title: { fontSize: 28, fontWeight: '800', color: '#f8fafc', marginBottom: 6 },
    subtitle: { fontSize: 14, color: '#94a3b8', marginBottom: 28, fontWeight: '500' },
    input: {
        width: '100%',
        borderWidth: 1.5,
        borderColor: '#334155',
        borderRadius: 14,
        padding: 16,
        fontSize: 16,
        color: '#f8fafc',
        marginBottom: 16,
        backgroundColor: '#0f172a',
    },
    btn: {
        width: '100%',
        backgroundColor: '#3b82f6',
        borderRadius: 14,
        padding: 16,
        alignItems: 'center',
        marginTop: 8,
    },
    btnText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
});
