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
      description: 'Broad topic grouping within a service page.',
      options: {
        list: [
          { title: 'About this service',  value: 'about' },
          { title: 'Booking and Pricing', value: 'booking-and-pricing' },
          { title: 'Treatment',           value: 'treatment' },
          { title: 'Safety and Suitability', value: 'safety' },
        ],
      },
      initialValue: 'about',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'serviceCategory',
      title: 'Service Category',
      type: 'string',
      description: 'Assigns this FAQ to a specific service page. Values match the page route slugs.',
      options: {
        list: [
          { title: 'GP Consultations',          value: 'gp-consultations' },
          { title: 'Weight Management',          value: 'weight-management' },
          { title: 'Hair Loss',                  value: 'hair-loss' },
          { title: 'Sick Certification',         value: 'sick-certification' },
          { title: 'Referrals and Prescriptions', value: 'referrals-prescriptions' },
          { title: 'General — appears on FAQ page', value: 'general' },
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
