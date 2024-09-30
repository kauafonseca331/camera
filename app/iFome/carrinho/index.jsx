import React, { useContext } from "react";
import { AppContext } from "../../../scripts/appContext";
import { Text, FlatList, View, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';

const CarrinhoScreen = () => {
    const { cardapio, carrinho, pedido, alterarQuantidade } = useContext(AppContext);

    return (
        <>
            <View style={styles.header}>
                <Link href="/iFome">
                    <MaterialCommunityIcons name="arrow-left-bold" size={32} color="#fff" />
                </Link>
                <Text style={styles.title}>Carrinho de Compras</Text>
            </View>

            <View style={styles.body}>
                {carrinho === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Feather name="shopping-bag" size={72} color="#aaa" />
                        <Text style={styles.emptyText}>Seu carrinho está vazio!</Text>
                    </View>
                ) : (
                    <FlatList
                        data={cardapio.filter(item => item.quantidade > 0)}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.itemCard}>
                                <View style={styles.itemDetails}>
                                    <Text style={styles.itemName}>{item.nome}</Text>
                                    {/* Alterando o provedor para 'Lanchonete do Kauã' */}
                                    <Text style={styles.itemVendor}>Lanchonete do Kauã</Text>
                                    <Text style={styles.itemTotalPrice}>R${(item.valor * item.quantidade).toFixed(2).replace('.', ',')}</Text>
                                </View>
                                <View style={styles.quantityControl}>
                                    <TouchableOpacity onPress={() => alterarQuantidade(item.id, 'decrementar')}>
                                        <Feather name="minus-circle" size={24} color="#ff6f61" />
                                    </TouchableOpacity>
                                    <Text style={styles.quantityText}>{item.quantidade}</Text>
                                    <TouchableOpacity onPress={() => alterarQuantidade(item.id, 'incrementar')}>
                                        <Feather name="plus-circle" size={24} color="#00b894" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    />
                )}

                {carrinho !== 0 && (
                    <View style={styles.footer}>
                        <View style={styles.totalBox}>
                            <Text style={styles.totalLabel}>Valor Total:</Text>
                            <Text style={styles.totalAmount}>R${pedido.toFixed(2).replace('.', ',')}</Text>
                        </View>
                        <TouchableOpacity style={styles.checkoutButton}>
                            <Text style={styles.checkoutText}>Concluir Pedido</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#1e3a8a',
        paddingVertical: 20,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    body: {
        flex: 1,
        backgroundColor: '#f3f4f6',
        paddingHorizontal: 15,
        paddingTop: 10,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 20,
        color: '#777',
        marginTop: 15,
    },
    itemCard: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        elevation: 5,
    },
    itemDetails: {
        flex: 1,
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemVendor: {
        fontSize: 14,
        color: '#666',
        marginVertical: 4,
    },
    itemTotalPrice: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ff6f61',
    },
    quantityControl: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityText: {
        fontSize: 18,
        marginHorizontal: 10,
        fontWeight: 'bold',
    },
    footer: {
        paddingTop: 20,
        paddingBottom: 40,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        alignItems: 'center',
    },
    totalBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    totalAmount: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#ff6f61',
    },
    checkoutButton: {
        backgroundColor: '#00b894',
        paddingVertical: 15,
        paddingHorizontal: 60,
        borderRadius: 50,
    },
    checkoutText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default CarrinhoScreen;
