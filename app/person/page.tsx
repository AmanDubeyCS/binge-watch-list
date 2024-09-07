'use client'
import { useGetPopularPersons } from '@/quries/TMDB/getPersonData'
import React from 'react'

export default function PersoneData({}) {
  const {data, error, isLoading} = useGetPopularPersons()
  console.log(data)
  return (
    <div>
      
    </div>
  )
}
