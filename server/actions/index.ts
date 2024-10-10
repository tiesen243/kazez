'use server'

import { cookies } from 'next/headers'
import { z } from 'zod'

import { protectedAction, publicAction } from '@/server/actions/safe-action'

export const getSavedAnime = protectedAction
  .metadata({ name: 'getSavedAnime' })
  .action(async ({ ctx }) => {
    const savedAnime = await ctx.db.savedAnime.findMany({ where: { userId: ctx.session.user.id } })
    return savedAnime
  })

export const checkInList = publicAction
  .metadata({ name: 'checkInList' })
  .schema(z.object({ id: z.string() }))
  .action(async ({ ctx, parsedInput }) => {
    if (!ctx.session) return { inList: false }

    const savedAnime = await ctx.db.savedAnime.findUnique({
      where: { id: parsedInput.id, userId: ctx.session.user.id },
    })

    return { inList: !!savedAnime }
  })

export const toggleSaveAnime = protectedAction
  .metadata({ name: 'saveAnime' })
  .schema(z.object({ id: z.string(), title: z.string(), image: z.string() }))
  .action(async ({ ctx, parsedInput }) => {
    const savedAnime = await ctx.db.savedAnime.findUnique({
      where: { id: parsedInput.id, userId: ctx.session.user.id },
    })

    if (savedAnime) {
      await ctx.db.savedAnime.delete({ where: { id: parsedInput.id } })
      return { saved: false }
    }

    await ctx.db.savedAnime.create({
      data: {
        id: parsedInput.id,
        title: parsedInput.title,
        image: parsedInput.image,
        userId: ctx.session.user.id,
      },
    })

    return { saved: true }
  })

export const loadSavedAnime = protectedAction
  .metadata({ name: 'loadSavedAnime' })
  .action(async ({ ctx }) => {
    const savedAnime = await ctx.db.savedAnime.findMany({
      where: { userId: ctx.session.user.id },
    })

    if (savedAnime.length === 0) return []
    return savedAnime
  })

export const getComments = publicAction
  .metadata({ name: 'getComments' })
  .schema(z.object({ id: z.string() }))
  .action(async ({ ctx, parsedInput }) => {
    const comments = await ctx.db.comment.findMany({
      where: { animeId: parsedInput.id },
      include: { user: true },
    })
    if (comments.length === 0) return []
    return comments
  })

export const addComment = protectedAction
  .metadata({ name: 'addComment' })
  .schema(z.object({ id: z.string(), content: z.string() }))
  .action(async ({ ctx, parsedInput }) => {
    await ctx.db.comment.create({
      data: {
        animeId: parsedInput.id,
        content: parsedInput.content,
        user: { connect: { id: ctx.session.user.id } },
      },
    })
    return { success: true }
  })

export const deleteComment = protectedAction
  .metadata({ name: 'deleteComment' })
  .schema(z.object({ id: z.string() }))
  .action(async ({ ctx, parsedInput }) => {
    await ctx.db.comment.delete({ where: { id: parsedInput.id } })
    return { success: true }
  })

export const signOut = protectedAction.metadata({ name: 'signOut' }).action(async ({ ctx }) => {
  await ctx.lucia.invalidateSession(ctx.session.id)
  const sessionCookie = ctx.lucia.createBlankSessionCookie()
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
})
