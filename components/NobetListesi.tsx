'use client'

import { useState, useEffect } from 'react'
import { getNobetler, silNobet } from '@/utils/nobetUtils'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function NobetListesi({ month, year }) {
  const [nobetler, setNobetler] = useState([])

  useEffect(() => {
    setNobetler(getNobetler(month, year))
  }, [month, year])

  const handleDelete = (id: number) => {
    silNobet(id)
    setNobetler(getNobetler(month, year))
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Nöbet Listesi</CardTitle>
        <Button onClick={handlePrint}>Yazdır</Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {nobetler.sort((a, b) => a.tarih.localeCompare(b.tarih)).map((nobet) => (
            <div 
              key={nobet.id} 
              className={`p-4 rounded-lg flex justify-between items-center ${
                nobet.resmiTatil ? 'bg-red-100' : (nobet.haftaSonu ? 'bg-amber-100' : 'bg-blue-100')
              }`}
            >
              <div className="space-y-1">
                <div className="font-medium">{nobet.personel}</div>
                <div className="text-sm text-gray-600">
                  {new Date(nobet.tarih).toLocaleDateString('tr-TR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(nobet.id)}
              >
                Sil
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
