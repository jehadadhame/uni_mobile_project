import { collection, onSnapshot, query, where, orderBy } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../../utils/firebase/initfirebase"
import { ItemStatus } from "../../data/items/ItemStatus"
import { UserRole } from "../../data/users/UserRole"
export const useItemsQuery = ({
    searchTerm,
    user,
    statusFilter,
    categoryFilter,
    orderyBy,
    minPrice,
    maxPrice,
    hasPriceFilter
}) => {
    const [items, setItems] = useState(null)
    console.log("in search Query searchTerm : ", searchTerm)
    console.log("in search Query user : ", user)
    console.log("in search Query statusFilter : ", statusFilter)
    console.log("in search Query categoryFilter : ", categoryFilter)
    console.log("in search Query orderyBy : ", orderyBy)
    console.log("in search Query minPrice : ", minPrice)
    console.log("in search Query maxPrice : ", maxPrice)
    console.log("in search Query hasPriceFilter : ", hasPriceFilter)
    useEffect(() => {
        const conditions = []

        if (searchTerm.trim() !== "") {
            conditions.push(where("title", ">=", searchTerm))
            conditions.push(where("title", "<=", searchTerm + "\uf8ff"))
        }

        if (user.role == UserRole.Seller) {
            conditions.push(where("createdBy", "==", user.uid))
        }

        if (statusFilter) {
            conditions.push(where("status", "==", statusFilter))
        }

        if (categoryFilter) {
            conditions.push(where("category", "==", categoryFilter))
        }

        if (hasPriceFilter) {
            conditions.push(where("price", ">=", minPrice))
            conditions.push(where("price", "<=", maxPrice))
        }

        if (orderyBy) {
            conditions.push(orderBy(orderyBy))
        }


        const q = query(collection(db, "items"), ...conditions)

        const unsub = onSnapshot(q, snap => {
            const list = []
            snap.forEach(doc => {
                list.push({
                    id: doc.id,
                    category: ItemStatus[doc.data().category],
                    ...doc.data()
                })
            })
            setItems(list)
        })

        return () => unsub()

    }, [searchTerm, user.uid, user.role, orderyBy, statusFilter, categoryFilter, minPrice, maxPrice, hasPriceFilter])
    return items;
}