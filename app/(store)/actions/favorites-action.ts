"use server"

import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import { client } from "@/sanity/lib/client"

export async function toggleFavorite(productId: string) {
  try {
    const { userId } = await auth()

    if (!userId) {
      throw new Error("Unauthorized")
    }

    const existingFavorite = await client.fetch(
      `*[_type == "favorite" && userId == $userId && productId == $productId][0]`,
      { userId, productId },
    )

    if (existingFavorite) {
      await client.delete(existingFavorite._id)
    } else {
      await client.create({
        _type: "favorite",
        userId,
        productId,
        createdAt: new Date().toISOString(),
      })
    }

    revalidatePath("/favorites")
    return { success: true }
  } catch (error) {
    console.error("Error toggling favorite:", error)
    return { success: false, error: "Failed to update favorite" }
  }
}

export async function getFavorites() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return []
    }

    const favorites = await client.fetch(
      `*[_type == "favorite" && userId == $userId]{
        _id,
        productId,
        "product": *[_type == "product" && _id == ^.productId][0]{
          _id,
          name,
          price,
          description,
          "slug": slug.current,
          "imageUrl": image.asset->url
        }
      }`,
      { userId },
    )

    return favorites
  } catch (error) {
    console.error("Error fetching favorites:", error)
    return []
  }
}

export async function isFavorite(productId: string) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return false
    }

    const favorite = await client.fetch(
      `*[_type == "favorite" && userId == $userId && productId == $productId][0]`,
      { userId, productId },
    )

    return !!favorite
  } catch (error) {
    console.error("Error checking favorite status:", error)
    return false
  }
}

