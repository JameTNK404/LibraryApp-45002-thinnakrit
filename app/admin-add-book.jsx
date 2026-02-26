import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { addBook } from '../src/database/db';

export default function AdminAddBookScreen() {
    const [title, setTitle] = useState('');
    const router = useRouter();

    const handleAdd = () => {
        if (!title.trim()) {
            Alert.alert('ข้อผิดพลาด', 'กรุณากรอกชื่อหนังสือก่อน');
            return;
        }
        addBook(title.trim());
        Alert.alert('สำเร็จ', `เพิ่ม "${title.trim()}" เรียบร้อยแล้ว`, [
            { text: 'เพิ่มอีก', onPress: () => setTitle('') },
            { text: 'กลับ', onPress: () => router.back() },
        ]);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={styles.back}>← กลับ</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>➕ เพิ่มหนังสือใหม่</Text>
                <View style={{ width: 50 }} />
            </View>

            <View style={styles.form}>
                <Text style={styles.emoji}>📗</Text>
                <Text style={styles.label}>ชื่อหนังสือ</Text>
                <TextInput
                    style={styles.input}
                    placeholder="กรอกชื่อหนังสือ"
                    placeholderTextColor="#9e9e9e"
                    value={title}
                    onChangeText={setTitle}
                    multiline
                />
                <Text style={styles.note}>* หนังสือใหม่จะถูกเพิ่มด้วยสถานะ "ว่าง" โดยอัตโนมัติ</Text>

                <TouchableOpacity style={styles.btn} onPress={handleAdd}>
                    <Text style={styles.btnText}>➕ เพิ่มหนังสือ</Text>
                </TouchableOpacity>
            </View>
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
    headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    form: {
        margin: 16,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 4,
        alignItems: 'center',
    },
    emoji: { fontSize: 56, marginBottom: 16 },
    label: { alignSelf: 'flex-start', fontSize: 15, fontWeight: '600', color: '#0d47a1', marginBottom: 8 },
    input: {
        width: '100%',
        borderWidth: 1.5,
        borderColor: '#e0e0e0',
        borderRadius: 12,
        padding: 14,
        fontSize: 16,
        color: '#333',
        backgroundColor: '#fafafa',
        minHeight: 60,
        textAlignVertical: 'top',
        marginBottom: 10,
    },
    note: { alignSelf: 'flex-start', fontSize: 12, color: '#9e9e9e', marginBottom: 20 },
    btn: {
        width: '100%',
        backgroundColor: '#0d47a1',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
    },
    btnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
