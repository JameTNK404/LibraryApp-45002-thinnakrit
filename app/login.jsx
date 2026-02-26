import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { loginUser } from '../src/database/db';
import { useAuth } from '../src/context/AuthContext';

export default function LoginScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const { login } = useAuth();

    const handleLogin = () => {
        // Validation
        if (!username.trim() || !password.trim()) {
            Alert.alert('ข้อผิดพลาด', 'กรุณากรอกชื่อผู้ใช้และรหัสผ่านให้ครบ');
            return;
        }
        const user = loginUser(username.trim(), password.trim());
        if (!user) {
            Alert.alert('ข้อผิดพลาด', 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
            return;
        }
        if (user.role !== 'member') {
            Alert.alert('ข้อผิดพลาด', 'บัญชีนี้ไม่ใช่สมาชิก กรุณาใช้หน้า Admin Login');
            return;
        }
        login(user);
        router.replace('/books');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                <Text style={styles.backText}>← กลับ</Text>
            </TouchableOpacity>

            <View style={styles.card}>
                <Text style={styles.emoji}>👤</Text>
                <Text style={styles.title}>เข้าสู่ระบบ</Text>
                <Text style={styles.subtitle}>สำหรับสมาชิก</Text>

                <TextInput
                    style={styles.input}
                    placeholder="ชื่อผู้ใช้งาน"
                    placeholderTextColor="#9e9e9e"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="รหัสผ่าน"
                    placeholderTextColor="#9e9e9e"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TouchableOpacity style={styles.btn} onPress={handleLogin}>
                    <Text style={styles.btnText}>เข้าสู่ระบบ</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push('/register')}>
                    <Text style={styles.linkText}>ยังไม่มีบัญชี? <Text style={styles.link}>สมัครสมาชิก</Text></Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f0f9ff', padding: 24, justifyContent: 'center' },
    backBtn: { position: 'absolute', top: 56, left: 24, padding: 8 },
    backText: { color: '#0369a1', fontSize: 16, fontWeight: '600' },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 24,
        padding: 32,
        alignItems: 'center',
        shadowColor: '#0ea5e9',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.15,
        shadowRadius: 24,
        elevation: 10,
        borderWidth: 1,
        borderColor: '#e0f2fe',
    },
    emoji: { fontSize: 56, marginBottom: 16 },
    title: { fontSize: 28, fontWeight: '800', color: '#0c4a6e', marginBottom: 6 },
    subtitle: { fontSize: 15, color: '#0ea5e9', marginBottom: 28, fontWeight: '500' },
    input: {
        width: '100%',
        borderWidth: 1.5,
        borderColor: '#bae6fd',
        borderRadius: 14,
        padding: 16,
        fontSize: 16,
        color: '#0c4a6e',
        marginBottom: 16,
        backgroundColor: '#f8fafc',
    },
    btn: {
        width: '100%',
        backgroundColor: '#0284c7',
        borderRadius: 14,
        padding: 16,
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 20,
    },
    btnText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
    linkText: { color: '#64748b', fontSize: 15 },
    link: { color: '#0284c7', fontWeight: 'bold' },
});
