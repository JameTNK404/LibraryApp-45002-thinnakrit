import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { registerUser } from '../src/database/db';

export default function RegisterScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const router = useRouter();

    const handleRegister = () => {
        if (!username.trim() || !password.trim() || !confirm.trim()) {
            Alert.alert('ข้อผิดพลาด', 'กรุณากรอกข้อมูลให้ครบทุกช่อง');
            return;
        }
        if (password !== confirm) {
            Alert.alert('ข้อผิดพลาด', 'รหัสผ่านไม่ตรงกัน');
            return;
        }
        if (password.length < 4) {
            Alert.alert('ข้อผิดพลาด', 'รหัสผ่านต้องมีอย่างน้อย 4 ตัวอักษร');
            return;
        }
        const result = registerUser(username.trim(), password.trim());
        if (!result.success) {
            Alert.alert('ข้อผิดพลาด', 'ชื่อผู้ใช้นี้มีอยู่แล้ว กรุณาใช้ชื่ออื่น');
            return;
        }
        Alert.alert('สำเร็จ', 'สมัครสมาชิกเรียบร้อยแล้ว', [
            { text: 'เข้าสู่ระบบ', onPress: () => router.replace('/login') },
        ]);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                <Text style={styles.backText}>← กลับ</Text>
            </TouchableOpacity>

            <View style={styles.card}>
                <Text style={styles.emoji}>📝</Text>
                <Text style={styles.title}>สมัครสมาชิก</Text>

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
                    placeholder="รหัสผ่าน (อย่างน้อย 4 ตัวอักษร)"
                    placeholderTextColor="#9e9e9e"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TextInput
                    style={styles.input}
                    placeholder="ยืนยันรหัสผ่าน"
                    placeholderTextColor="#9e9e9e"
                    value={confirm}
                    onChangeText={setConfirm}
                    secureTextEntry
                />

                <TouchableOpacity style={styles.btn} onPress={handleRegister}>
                    <Text style={styles.btnText}>สมัครสมาชิก</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.replace('/login')}>
                    <Text style={styles.linkText}>มีบัญชีแล้ว? <Text style={styles.link}>เข้าสู่ระบบ</Text></Text>
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
    title: { fontSize: 28, fontWeight: '800', color: '#0c4a6e', marginBottom: 24 },
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
