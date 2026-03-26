import vine from '@vinejs/vine'

export const createMediaValidator = vine.compile(
  vine.object({
    url: vine.string().trim(),
    img: vine.file({
      size: '2mb',
      extnames: ['jpg', 'png', 'pdf']
    }) 
  })
)
