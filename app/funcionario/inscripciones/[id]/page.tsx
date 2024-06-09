'use client';
import { useEffect, useState } from 'react';
import { getPeriodosExamenCarrera } from '@/lib/data/funcionario/actions';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';
import Button from '@/components/Button/button';
import Link from 'next/link';
import { Carrera } from '@/lib/definitions';
import { useRouter } from 'next/navigation';
import List from '@/components/List/list';

export default function InscripcionesPage({ params }: { params: { id: string } }) {


}