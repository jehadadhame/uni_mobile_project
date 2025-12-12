import { collection, onSnapshot, query, where, orderBy, documentId } from "firebase/firestore"
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
    hasPriceFilter,
    itemsIds = null,
}) => {
    const [items, setItems] = useState(null)

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

        if (itemsIds != null) {
            if (itemsIds.length == 0) {
                conditions.push(where(documentId(), "in", ["9283f8as"]/** it's just a random number so if it's empty list as the case when 
                favorit screen invoks it without favorits items firebase will rais an error */))
            }
            conditions.push(where(documentId(), "in", itemsIds))
            console.log(`in querey docuement id :  ${documentId()} , itemsids ${itemsIds}`)
        } else {
            console.log("in querey false : ", itemsIds)
        }

        if (orderyBy) {
            conditions.push(orderBy(orderyBy))
        }



        const q = query(collection(db, AppCollections.items), ...conditions)

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

    }, [searchTerm, user.uid, user.role, orderyBy, statusFilter, categoryFilter, minPrice, maxPrice, hasPriceFilter, itemsIds])
    return items;
}