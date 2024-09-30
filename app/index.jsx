import { View, StyleSheet, FlatList, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

const Rotas = () => {

    const data = [
        {
            id: '9', 
            href: "/iFome", 
            text: "iFome", 
            subtitle: "Lanchonete do Kauã"
        },
    ];

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Link href={item.href} style={styles.link}>
                        <TouchableOpacity style={styles.card}>
                            <Text style={styles.cardText}>{item.text}</Text>
                            <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
                        </TouchableOpacity>
                    </Link>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1c1c1c',
        justifyContent: 'center',
        padding: 20,
    },
    link: {
        width: '100%',
        marginVertical: 12,
    },
    card: {
        backgroundColor: '#282828',
        paddingVertical: 30,
        paddingHorizontal: 20,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 5,
        borderWidth: 2,
        borderColor: '#ff4500',
    },
    cardText: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
        letterSpacing: 2,
    },
    cardSubtitle: {
        fontSize: 16,
        color: '#ff8c00',
        marginTop: 8,
    },
});

export default Rotas;
