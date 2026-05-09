import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet,
  Alert
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [meetings, setMeetings] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    saveData();
  }, [meetings]);

  const loadData = async () => {
    try {
      const data = await AsyncStorage.getItem("meetings");
      if (data) setMeetings(JSON.parse(data));
    } catch (e) {}
  };

  const saveData = async () => {
    try {
      await AsyncStorage.setItem("meetings", JSON.stringify(meetings));
    } catch (e) {}
  };

  const addMeeting = () => {
    if (!title || !date) {
      Alert.alert("تنبيه", "أدخل عنوان وتاريخ الاجتماع");
      return;
    }

    const newItem = {
      id: Date.now(),
      title,
      date,
      notes,
      status: "قيد المراجعة"
    };

    setMeetings([newItem, ...meetings]);
    setTitle("");
    setDate("");
    setNotes("");
  };

  const deleteMeeting = (id) => {
    setMeetings(meetings.filter((m) => m.id !== id));
  };

  const approveMeeting = (id) => {
    const updated = meetings.map((m) =>
      m.id === id ? { ...m, status: "تم الاعتماد ✓" } : m
    );
    setMeetings(updated);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>نظام الاجتماعات</Text>

      <View style={styles.card}>
        <TextInput
          placeholder="عنوان الاجتماع"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />

        <TextInput
          placeholder="التاريخ"
          value={date}
          onChangeText={setDate}
          style={styles.input}
        />

        <TextInput
          placeholder="ملاحظات"
          value={notes}
          onChangeText={setNotes}
          style={styles.input}
        />

        <Pressable style={styles.btn} onPress={addMeeting}>
          <Text style={styles.btnText}>إضافة اجتماع</Text>
        </Pressable>
      </View>

      <FlatList
        data={meetings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text>{item.date}</Text>
            <Text>{item.notes}</Text>
            <Text style={{ color: "blue" }}>{item.status}</Text>

            <View style={{ flexDirection: "row", marginTop: 5 }}>
              <Pressable
                style={[styles.smallBtn, { backgroundColor: "green" }]}
                onPress={() => approveMeeting(item.id)}
              >
                <Text style={styles.btnText}>اعتماد</Text>
              </Pressable>

              <Pressable
                style={[styles.smallBtn, { backgroundColor: "red" }]}
                onPress={() => deleteMeeting(item.id)}
              >
                <Text style={styles.btnText}>حذف</Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
}

كونست.. styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#f2f2f2" },container: { flex: 1, padding: 15, backgroundColor: "#f2f2f2" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  card: { backgroundColor: "white", padding: 10, borderRadius: 10 },بطاقة..: { خلفية اللوناللون: "white", الحشو..: 10, borderRadius: 10 },
 مدخلات: { input: {مدخلات: { مدخلات..: {
 الحدود: 1، الحدودالعرض: 1،الحدود: 1، الحدودالعرض: 1،
   لون  الحدود:   "#ccc"،  الحدود:  "#ccc"، borderColor: "#ccc",
 الهامش  القاع:  8، marginBottom: 8,
 لون: 8، padding: 8,
  مراديوس  الحدود:  5    الحدود:  5 borderRadius: 5 
  }, , },
 BTN.......: { BTN.....: {
  خلفية  اللون:    "#007bff"، خلفية اللون: 0خلفية  اللون: BFF "،bff",.:   اللون0خلفية  اللون: اللون:     "،bff",
    اللون:    الحشو:     الحشو: 10،: 10 اللونالحشو:  الحشو:  الحشو,:   
   الحشو  الحشو    الحدود:  5    الحدود:   5 مراديوس  الحدود: 5  الحشو   الحدود: 5   الحدود:  5 مراديوس  الحدود: 5
  }, , },
 btnText: { اللون: btnText، textAlign: الأبيض:  "white", : : "center" },
 البند: البندالحدودالبند: { item: {
 الخلفيةاللون: ""أبيض""، backgroundColor: "white",
 الحشو: 10،: 10,
 الهامش  الأعلى:  10الأعلىالأعلى10,
 مراديوسمراديوس8الحدودالهامشالصحيح5،8
 }, },
 البندالعنوان: {fontSize: 18, fontWeight: "bold" }, itemTitle: { fontSize: 18, fontWeight: bold" },
 صغير صغير: { smallBtn: {
 الحشو: 6، padding: 6,
 الهامش marginRight: الهامش الصحيح: marginRight: 5   الصحيح:   
 مراديوس الحدود: 5 
 } }
}););
