import { NextRequest, NextResponse } from 'next/server'
import { prismaClient } from '@/lib/prisma'
import http from 'http-status-codes'
import bcrypt from 'bcrypt'


export async function POST(req: NextRequest) {
  const data =  await req.json()
  const {name, email, password} = data

  if(!name || !email || !password) return NextResponse.json({
    error: {
      message: 'Nome, e-mail e senha são obrigatórios'
    }
  }, {
    status: 400,
    statusText: http.getStatusText(400) 
  })

  const userExists = await prismaClient.user.findUnique({
    where: {
      email
    }
  })

  if(userExists) return NextResponse.json({
    error: {
      message: `Já existe um usuário com o e-mail ${email}`
    }
  }, {
    status: 409,
    statusText: http.getStatusText(409) 
  })

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prismaClient.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  })

  return NextResponse.json(user, {
    status: 201,
    statusText: http.getStatusText(201) 
  })

}