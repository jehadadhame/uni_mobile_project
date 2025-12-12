import { useNavigation } from "@react-navigation/native"
import { collection, onSnapshot, query, where, orderBy, getDoc, doc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { db } from "../../../utils/firebase/initfirebase"
import { ItemCard } from "../../../components/screen/items/ItemCard"
import { useAuth } from "../../../context/AppContext"
import { UserRole } from "../../../data/users/UserRole"
import { Button, Modal, Searchbar, SegmentedButtons, TextInput } from "react-native-paper"
import { ItemStatus } from "../../../data/items/ItemStatus"
import { ItemCategories } from "../../../data/items/ItemCategories"
import { ItemCondition } from "../../../data/items/ItemCondition"
import { useItemsQuery } from "../../../services/items/itemeQuerey"
import { AppCollections } from "../../../data/AppCollections"

export const FavoriteItem = () => {

    const { user } = useAuth();
    console.log("user in favorites screen : ", user)
    const navigation = useNavigation()


    const [searchTerm, setSearchTearm] = useState("")
    const [categoryFilter, setCategoryFilter] = useState(null)
    const [statusFilter, setStatusFilter] = useState(null)
    const [orderyBy, setOrderBy] = useState(null)
    const [FilterVisible, setFilterVisible] = useState(false)
    const [hasPriceFilter, setHasPriceFilter] = useState(false)
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(0)
    const [favoriteItems, setFavoriteItems] = useState([])
    console.log("favoriteItems : ", favoriteItems)
    const handelSettingMinPrice = (minPriceToSet) => {
        minPriceToSet = Number(minPriceToSet);
        setHasPriceFilter(true)
        if (minPriceToSet > maxPrice) {
            setMinPrice(maxPrice - 1);
        } else {
            setMinPrice(minPriceToSet);
        }
    }
    const handelSettingMaxPrice = (maxPriceToSet) => {
        maxPriceToSet = Number(maxPriceToSet)
        setHasPriceFilter(true)
        if (maxPriceToSet < minPrice) {
            setMaxPrice(minPrice + 1)
        } else {
            setMaxPrice(maxPriceToSet)
        }
    }

    console.log("categoryFilte : ", categoryFilter)
    const clearFilters = () => {
        setStatusFilter(false);
        setCategoryFilter(false);
        setHasPriceFilter(false);
        setMinPrice(0);
    }
    useEffect(() => {
        const getFavoriteList = async () => {
            const itemsDoc = await getDoc(doc(db, AppCollections.favorites, user.uid))
            console.log("favorites : ", itemsDoc)
            setFavoriteItems(itemsDoc.data()?.regions ?? [])
        }
        getFavoriteList()
    }, [])


    const items = useItemsQuery({
        searchTerm,
        user,
        statusFilter,
        categoryFilter,
        orderyBy,
        minPrice,
        maxPrice,
        hasPriceFilter,
        itemsIds: favoriteItems,
    })
    return (
        <>
            <ScrollView style={styles.container}>
                <Text style={styles.title}>Favorite Items List</Text>

                <Searchbar
                    onChangeText={setSearchTearm}
                    value={searchTerm}
                />

                <Button onPress={() => setFilterVisible(true)}>Filter</Button>
                <Button onPress={() => clearFilters()}>clear Filters</Button>
                <Button onPress={() => setOrderMenuVisible(true)}>Order By</Button>

                <View style={styles.listContainer}>
                    {items && items.map(item => (
                        <TouchableOpacity
                            key={item.id}
                            onPress={() => navigation.navigate("ItemDetails", { item })}
                        >
                            <ItemCard item={item} role={user.role} isFavoriteItemScreen={true} uid={user.uid} />
                        </TouchableOpacity>
                    ))}
                </View>


                <View style={styles.addButton}>
                    {(user.role == UserRole.Admin || user.role == UserRole.Seller) && <Button onPress={() => navigation.navigate("AddItem")}>
                        Add
                    </Button>}
                </View>
            </ScrollView>

            {/* Filter Modal */}
            <Modal visible={FilterVisible} onDismiss={() => setFilterVisible(false)}>
                <View style={{ padding: 20, backgroundColor: "white" }}>
                    <Text>Status:</Text>
                    <SegmentedButtons
                        value={statusFilter}
                        onValueChange={setStatusFilter}
                        buttons={[
                            { value: ItemStatus.sold, label: ItemStatus.sold },
                            { value: ItemStatus.reserved, label: ItemStatus.reserved },
                            { value: ItemStatus.available, label: ItemStatus.available },
                        ]}
                    />
                    <Text>Condition:</Text>
                    <SegmentedButtons
                        value={statusFilter}
                        onValueChange={setStatusFilter}
                        buttons={[
                            { value: ItemCondition.new, label: ItemCondition.new },
                            { value: ItemCondition.used, label: ItemCondition.used },
                        ]}
                    />

                    <Text>Category</Text>
                    <SegmentedButtons
                        value={categoryFilter}
                        onValueChange={setCategoryFilter}
                        buttons={[
                            { value: ItemCategories.cpu, label: ItemCategories.cpu },
                            { value: ItemCategories.gpu, label: ItemCategories.gpu },
                            { value: ItemCategories.ram, label: ItemCategories.ram },
                            { value: ItemCategories.nvmeSsd, label: ItemCategories.nvmeSsd },
                        ]}
                    />
                    <Text>Price Range</Text>
                    <TextInput label="Min Price" value={String(minPrice)} keyboardType="numeric" onChangeText={(txt) => handelSettingMinPrice(txt)} />
                    <TextInput label="Max Price" value={String(maxPrice)} keyboardType="numeric" onChangeText={(txt) => handelSettingMaxPrice(txt)} />
                    <Button onPress={() => setFilterVisible(false)}>Close</Button>
                </View>
            </Modal>

        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#fff",
    },

    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 12,
        textAlign: "center",
    },

    listContainer: {
        gap: 12,
        marginBottom: 20,
    },

    addButton: {
        marginTop: 20,
        marginBottom: 40,
        alignSelf: "center",
        width: 120,
    }
})

