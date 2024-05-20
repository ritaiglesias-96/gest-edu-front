export default function CarreraPage({ params }: { params: { id: string } }) {
  return <h1 className='text-ivory'>Carrera {params.id}</h1>;
}
