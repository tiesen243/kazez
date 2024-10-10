'use server'

import { cookies } from 'next/headers'
import { z } from 'zod'

import { protectedAction, publicAction } from '@/server/actions/safe-action'

export const getUser = publicAction
  .metadata({ name: 'getUser' })
  .schema(z.object({ id: z.string() }))
  .action(async ({ ctx, parsedInput }) => {
    const user = await ctx.db.user.findUnique({ where: { id: parsedInput.id } })
    if (!user) return { user: null, isCurrentUser: false, savedAnime: [] }

    const savedAnime = await ctx.db.savedAnime.findMany({
      where: { userId: user.id },
    })

    return { user, savedAnime }
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

export const signOut = protectedAction.metadata({ name: 'signOut' }).action(async ({ ctx }) => {
  await ctx.lucia.invalidateSession(ctx.session.id)
  const sessionCookie = ctx.lucia.createBlankSessionCookie()
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
})
