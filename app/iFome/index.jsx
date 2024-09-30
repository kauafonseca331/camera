import { Text, View, FlatList, Pressable, Image, StyleSheet } from "react-native";
import Bar from "../../components/Bar";
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useContext } from "react";
import { Link } from "expo-router";
import { AppContext } from "../../scripts/appContext";

const iFome = () => {
    const { cardapio, carrinho, alterarQuantidade } = useContext(AppContext);

    return (
        <>
            <Bar
                icon={<Entypo name="home" size={24} color="white" />}
                href={'/'}
                Titulo={'iFome'}
                cor={'#FF5733'}
            />
            <View style={styles.container}>
                <View style={styles.cartContainer}>
                    <Link href={'iFome/carrinho'} style={styles.cartLink}>
                        <AntDesign name="shoppingcart" size={24} color="#FF5733" />
                        <Text style={styles.cartText}>{carrinho} itens</Text>
                    </Link>
                </View>
                <FlatList
                    data={cardapio}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Image
                                style={styles.image}
                                source={{ uri: item.imagem }}
                            />
                            <View style={styles.info}>
                                <Text style={styles.title}>{item.nome}</Text>
                                <Text style={styles.subtitle}>Lanchonete do Kauã</Text>
                                <Text style={styles.description}>{item.descricao}</Text>
                                <View style={styles.priceContainer}>
                                    <Text style={styles.price}>R${item.valor.toFixed(2).replace('.', ',')}</Text>
                                    <View style={styles.quantityContainer}>
                                        <Pressable onPress={() => alterarQuantidade(item.id, 'decrementar')}>
                                            <Entypo name="minus" size={24} color="#FF5733" />
                                        </Pressable>
                                        <Text style={styles.quantity}>{item.quantidade}</Text>
                                        <Pressable onPress={() => alterarQuantidade(item.id, 'incrementar')}>
                                            <Entypo name="plus" size={24} color="#FF5733" />
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}
                    contentContainerStyle={styles.listContainer}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
        paddingHorizontal: 16,
        paddingTop: 10,
    },
    cartContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingVertical: 10,
    },
    cartLink: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cartText: {
        marginLeft: 4,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FF5733',
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginVertical: 8,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        borderWidth: 1,
        borderColor: '#FFE6E6', 
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 12,
        marginRight: 16,
        borderColor: '#FF5733', 
        borderWidth: 1,
    },
    info: {
        flex: 1,
        justifyContent: 'space-between',
    },
    title: {
        fontWeight: "bold",
        fontSize: 22,
        color: '#333',
    },
    subtitle: {
        fontSize: 14,
        color: '#888',
    },
    description: {
        fontSize: 12,
        color: '#555',
        marginVertical: 4,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    price: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#FF5733',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#FF5733',
        borderRadius: 8,
        borderWidth: 2,
        paddingHorizontal: 4,
        backgroundColor: '#FFE6E6', 
    },
    quantity: {
        fontSize: 14,
        fontWeight: '600',
        paddingHorizontal: 12,
        color: '#333',
    },
    listContainer: {
        paddingBottom: 20,
    },
});

export default iFome;
