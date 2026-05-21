import { defineField, defineType } from 'sanity'

export const faqItem = defineType({
  name: 'faqItem',
  title: 'FAQ Item',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Broad topic grouping for the FAQ index page.',
      options: {
        list: [
          { title: 'General', value: 'general' },
          { title: 'Booking', value: 'booking' },
          { title: 'Safety', value: 'safety' },
          { title: 'Services', value: 'services' },
          { title: 'Employers', value: 'employers' },
        ],
      },
    }),
    defineField({
      name: 'serviceCategory',
      title: 'Service Category',
      type: 'string',
      description: 'Assigns this FAQ item to a specific service page.',
      options: {
        list: [
          { title: 'General', value: 'general' },
          { title: 'GP Consultations', value: 'gp-consultations' },
          { title: 'Weight Management', value: 'weight-management' },
          { title: 'Hair Loss', value: 'hair-loss' },
          { title: 'Sick Certification', value: 'sick-certification' },
          { title: 'Referrals and Prescriptions', value: 'referrals-prescriptions' },
          { title: 'Employers', value: 'employers' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first within their service category.',
    }),
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'serviceCategory',
    },
  },
})
