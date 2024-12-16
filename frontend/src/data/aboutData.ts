import { Target, Lightbulb } from 'lucide-react';
import { UsersIcon, TruckIcon, StarIcon, ShieldCheckIcon, HeartIcon, SparklesIcon, UserGroupIcon } from '@heroicons/react/24/outline';

export const stats = [
  {
    label: 'Years of Excellence',
    number: '5+',
    description: 'Fueling journeys with trust and expertise since 2019',
    icon: ShieldCheckIcon,
  },
  {
    label: 'Happy Customers',
    number: '10,000+',
    description: 'Creating smiles, one bike at a time',
    icon: UsersIcon,
  },
  {
    label: 'Trusted Brands',
    number: '8+',
    description: 'Partnered with the best in the industry',
    icon: StarIcon,
  },
  {
    label: 'Memories Created',
    number: 'Countless',
    description: 'Turning every ride into a cherished memory',
    icon: TruckIcon,
  },
];

export const values = [
  {
    title: 'Customer First',
    description: 'Our customers are at the heart of every decision we make, ensuring their complete satisfaction.',
    icon: HeartIcon,
    color: 'text-red-500',
  },
  {
    title: 'Quality Service',
    description: 'Setting new standards for service excellence with every interaction.',
    icon: ShieldCheckIcon,
    color: 'text-blue-500',
  },
  {
    title: 'Innovation',
    description: 'Evolving continuously to redefine excellence in the two-wheeler industry.',
    icon: SparklesIcon,
    color: 'text-yellow-500',
  },
  {
    title: 'Team Excellence',
    description: 'Our dedicated team works together to deliver unparalleled experiences.',
    icon: UserGroupIcon,
    color: 'text-green-500',
  },
];

export const visionMissionItems = [
  {
    title: 'Our Mission',
    description: '"To be the most trusted and customer-centric two-wheeler dealership, offering not only the finest selection of bikes but also an unmatched after-sales experience that inspires loyalty and satisfaction."',
    icon: Target,
  },
  {
    title: 'Our Vision',
    description: '"To revolutionize the two-wheeler buying journey by seamlessly blending premium products, exceptional customer service, and cutting-edge technical expertise, redefining the way people connect with their rides."',
    icon: Lightbulb,
  },
];