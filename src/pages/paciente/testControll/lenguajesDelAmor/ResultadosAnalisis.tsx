import { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts'
import { loveLanguagesApi } from '../../../../utils/api'
import { FaWhatsapp } from 'react-icons/fa'
import NavBarOnlyGoBack from '../components/NavBarOnlyGoBack'
import { useNavigate } from 'react-router-dom'

interface Score {
  categoria: string
  recibirAmor: number
  expresarAmor: number
  total: number
}

interface ResultsResponse {
  scores: Score[]
  isCompleted: boolean
}

interface CustomLegendProps {
  payload: ChartsResults[];
}

interface ChartsResults {
  name: string,
  value: number,
  color: string
}

const COLORS = ['#6366f1', '#f472b6', '#facc15', '#34d399', '#60a5fa']
const languageKeys = [
  'Palabras de afirmación',
  'Actos de servicio',
  'Regalos',
  'Tiempo de calidad',
  'Contacto físico (Kinestésico)'
] as const

type LanguageKey = typeof languageKeys[number]

const languageAssets = {
  'Palabras de afirmación': {
    recibir: 'Cuando tu pareja te dice algo lindo, lo sientes en lo más profundo. No necesitas grandes gestos, solo escuchar un “te admiro” o “me haces feliz” basta para llenarte de amor. Las palabras tienen poder, y tú las valoras como un puente emocional. Te sientes visto y amado cuando tu pareja se toma el tiempo de expresarte con palabras cuánto significas.',
    expresar: 'Te encanta decir lo que sientes, y lo haces con palabras que levantan, motivan y llenan de cariño a tu pareja. Para ti, no hay nada más natural que decir "te amo", felicitar un logro o dejar un mensaje bonito. Sabes que un cumplido sincero o un “confío en ti” pueden iluminar el día. Tu forma de amar es verbal, directa y profunda; tus palabras son tu forma de abrazar con el alma.'
  },
  'Actos de servicio': {
    recibir: 'Cuando tu pareja hace algo por ti sin que se lo pidas, tu corazón se llena. Un desayuno, una ayuda inesperada o simplemente que te faciliten la vida, son detalles que te hacen sentir cuidado. Valoras a quien actúa por amor, y te sientes profundamente amado cuando alguien piensa en ti al hacer algo práctico. Para ti, las acciones sí dicen más que las palabras.',
    expresar: 'Tu manera de amar se ve en todo lo que haces por tu pareja. Tal vez no lo digas con palabras, pero lo demuestras cocinando algo especial, resolviendo problemas o ayudando cuando más se necesita. Para ti, amor es acción: es estar ahí, hacer lo que haga falta y mostrar que te importa con hechos. Cada gesto tuyo dice “puedes contar conmigo”.'
  },
  'Regalos': {
    recibir: 'Cuando tu pareja te da un regalo, sientes que te conoce, que se tomó el tiempo de pensar en ti. No se trata del objeto, sino del gesto, de sentirte valorado con algo especial. Para ti, los detalles cuentan, y son prueba de amor. Te conmueve saber que tu pareja te mira con atención y lo expresa con algo que puedes guardar, usar o recordar.',
    expresar: 'Te encanta sorprender a tu pareja con detalles que digan “pensé en ti”. Para ti, los regalos son símbolos: un chocolate, una carta, una flor o algo que sabes que le hará sonreír. No importa el precio, lo que importa es el significado. Cada obsequio tuyo lleva un pedacito de amor envuelto, porque regalar es tu forma de decir “me importas mucho”.'
  },
  'Tiempo de calidad': {
    recibir: 'No necesitas regalos ni grandes planes, solo que tu pareja esté contigo de verdad, sin prisas ni distracciones. Valoras el tiempo compartido como un acto de amor. Una conversación honesta, una cita sin pantallas o simplemente estar a su lado, te hace sentir amado. Para ti, el mejor regalo es la atención total y la conexión genuina.',
    expresar: 'Tu forma de amar es estar presente, dedicar tiempo real, sin distracciones. Para ti, un paseo, una conversación profunda o simplemente estar juntos viendo una película, vale más que mil palabras. Quieres compartir momentos que fortalezcan el vínculo, crear recuerdos, reír juntos. Amar es regalar presencia plena.'
  },
  'Contacto físico (Kinestésico)': {
    recibir: 'Un abrazo tuyo vale más que mil palabras. Sientes el amor cuando tu pareja te toma de la mano, te acaricia o simplemente se sienta cerca. Para ti, el tacto es reconfortante, es conexión, es amor tangible. Te hace sentir seguro, querido y especial. El contacto físico llena tu corazón y te hace sentir cerca de quien amas.',
    expresar: 'Tu amor se manifiesta a través del tacto: un abrazo largo, una caricia espontánea, un beso inesperado. Para ti, estar cerca físicamente es una forma de decir “te amo” sin palabras. El contacto te conecta, te permite cuidar y acompañar. Tu cuerpo habla con ternura y cercanía, y te gusta demostrar afecto con gestos que abrazan el alma.'
  }
}

const languageRouteImg = {
  'Palabras de afirmación': "/img/resultado-afirmacion.png",
  'Actos de servicio': "/img/resultado-servicios.png",
  'Regalos': "/img/resultado-regalos.png",
  'Tiempo de calidad': "/img/resultado-tiempo.png",
  'Contacto físico (Kinestésico)': "/img/resultado-contacto.png"
}

function getLanguageColor(categoria: string) {
  const idx = languageKeys.indexOf(categoria as LanguageKey)
  return COLORS[idx] || COLORS[0]
}

function getLanguageAsset(categoria: string) {
  return languageAssets[categoria as LanguageKey]
}

function getLanguageRoutes(categoria: string) {
  return languageRouteImg[categoria as LanguageKey]
}

const ResultadosAnalisis = () => {
  const [data, setData] = useState<ResultsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [errorCedula, setErrorCedula] = useState<string | null>(null)
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth)
  const [cedulaPareja, setCedulaPareja] = useState<string>('')

  const navigate = useNavigate()

  async function handleCompareScore(cedula: string) {
    if (cedula.length > 4) {
      setErrorCedula(null)
      loveLanguagesApi.compareResults(cedula)
        .then((response) => {
          if (response) {
            navigate('resultados-comparacion', { state: { partnerResults: response } })
          }
        })
        .catch((error) => {
          if (error.status === 404) {
            setErrorCedula('tu pareja no tiene resultados disponibles')
          } else {
            setErrorCedula('No se pudieron cargar los resultados')
          }
        })
    } else {
      setErrorCedula('Por favor, ingresa una cédula válida')
    }
  }

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true)
        setError(null)
        const json: ResultsResponse = await loveLanguagesApi.getResults()
        setData(json)
      } catch {
        setError('No se pudieron cargar los resultados')
      } finally {
        setLoading(false)
      }
    }
    fetchResults()
  }, [])

  if (loading) return <div className="flex justify-center items-center min-h-screen"><span className="loading loading-spinner loading-lg"></span></div>
  if (error || !data) return <div className="text-center text-error py-8">{error || 'Error inesperado'}</div>

  const recibirData = data.scores.map((s: Score, i: number) => ({ name: s.categoria, value: s.recibirAmor, color: COLORS[i] }))
  const expresarData = data.scores.map((s: Score, i: number) => ({ name: s.categoria, value: s.expresarAmor, color: COLORS[i] }))

  const sortedRecibir = [...data.scores].sort((a, b) => b.recibirAmor - a.recibirAmor)
  const sortedExpresar = [...data.scores].sort((a, b) => b.expresarAmor - a.expresarAmor)
  const primarioRecibir = sortedRecibir[0]
  const secundarioRecibir = sortedRecibir[1]
  const primarioExpresar = sortedExpresar[0]
  const secundarioExpresar = sortedExpresar[1]


  const chartHeight = windowWidth > 500 ? 350 : 220
  const outerRadius = windowWidth > 500 ? 120 : 70

  const renderCustomLegend = (props: CustomLegendProps) => {
    const { payload } = props

    return (
      <ul className={`flex flex-wrap justify-center mt-4 ${windowWidth <= 500 ? 'gap-x-4 gap-y-2' : 'gap-x-8'}`}>
        {payload.map((entry: ChartsResults, idx: number) => (
          <li key={`item-${idx}`} className="flex items-center mb-2">
            <span style={{ background: entry.color, width: 16, height: 16, display: 'inline-block', borderRadius: 4, marginRight: 8 }}></span>
            <span style={{ color: entry.color, fontWeight: 600 }}>{entry.name}</span>
          </li>
        ))}
      </ul>
    )
  }


  return (
    <div className="container mx-auto px-2 py-6 max-w-2xl">
      <div className='my-8 px-8'>
        <div>
          <NavBarOnlyGoBack />
        </div>
      </div>
      <h1 className="text-2xl md:text-3xl font-bold text-primary text-center mb-8">Resultados de tu Test</h1>
      <div className="flex flex-col gap-10 mb-10">
        {/* Pie Chart Recibir Amor */}
        <div className="bg-base-200 rounded-xl p-6 flex flex-col items-center shadow">
          <h2 className="text-primary font-semibold text-lg mb-4">¿Cómo te gusta recibir amor?</h2>
          <div className="w-full flex justify-center">
            <ResponsiveContainer width="100%" height={chartHeight}>
              <PieChart>
                <Pie
                  data={recibirData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={outerRadius}
                  fill="#6366f1"
                  label={false}
                  labelLine={false}
                  isAnimationActive={true}
                >
                  {recibirData.map((entry, idx) => (
                    <Cell key={`cell-recibir-${idx}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4" />
          {renderCustomLegend({ payload: recibirData })}
        </div>
        <div className='bg-base-200 rounded-xl p-6 flex flex-col items-center shadow'>
          <ResponsiveContainer width="100%" height={chartHeight}>
            <BarChart
              data={recibirData}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <Tooltip />
              <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={30}>
                {recibirData.map((entry, idx) => (
                  <Cell key={`bar-cell-${idx}`} fill={entry.color} />
                ))}
                {/* <LabelList dataKey="value" position="right" formatter={(value) => `${Math.round((value as number / 10) * 100)}%`} style={{ fill: '#fff', fontWeight: 600 }} /> */}
              </Bar>
              <XAxis
                type="number"
                domain={[0, 10]}
                hide
              />
              <YAxis
                type="category"
                dataKey="name"
                width={150}
                tick={{ fill: '#fff', fontWeight: 600 }}
              />
            </BarChart>
          </ResponsiveContainer>
          {/* Leyenda personalizada debajo del gráfico */}
          <ul className="w-full flex flex-col gap-2 mt-4">
            {recibirData.map((entry, idx) => (
              <li key={`legend-bar-${idx}`} className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span style={{ background: entry.color, width: 16, height: 16, display: 'inline-block', borderRadius: 4 }}></span>
                  <span style={{ color: entry.color, fontWeight: 600 }}>{entry.name}</span>
                </span>
                <span style={{ color: entry.color, fontWeight: 700 }}>{`${Math.round((entry.value / 10) * 100)}%`}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-base-200 rounded-xl p-6 flex flex-col items-center shadow">
          <h2 className="text-primary font-semibold text-lg mb-4">¿Cómo te gusta expresar amor?</h2>
          <div className="w-full flex justify-center">
            <ResponsiveContainer width="100%" height={chartHeight}>
              <PieChart>
                <Pie
                  data={expresarData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={outerRadius}
                  fill="#f472b6"
                  label={false}
                  labelLine={false}
                  isAnimationActive={true}
                >
                  {expresarData.map((entry, idx) => (
                    <Cell key={`cell-expresar-${idx}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4" />
          {renderCustomLegend({ payload: expresarData })}
        </div>
        
      </div>
   <div className='bg-base-200 rounded-xl p-6 flex flex-col items-center shadow'>
          <ResponsiveContainer width="100%" height={chartHeight}>
            <BarChart
              data={expresarData}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <Tooltip />
              <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={30}>
                {expresarData.map((entry, idx) => (
                  <Cell key={`bar-cell-${idx}`} fill={entry.color} />
                ))}
                {/* <LabelList dataKey="value" position="right" formatter={(value) => `${Math.round((value as number / 10) * 100)}%`} style={{ fill: '#fff', fontWeight: 600 }} /> */}
              </Bar>
              <XAxis
                type="number"
                domain={[0, 10]}
                hide
              />
              <YAxis
                type="category"
                dataKey="name"
                width={150}
                tick={{ fill: '#fff', fontWeight: 600 }}
              />
            </BarChart>
          </ResponsiveContainer>
          {/* Leyenda personalizada debajo del gráfico */}
          <ul className="w-full flex flex-col gap-2 mt-4">
            {recibirData.map((entry, idx) => (
              <li key={`legend-bar-${idx}`} className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span style={{ background: entry.color, width: 16, height: 16, display: 'inline-block', borderRadius: 4 }}></span>
                  <span style={{ color: entry.color, fontWeight: 600 }}>{entry.name}</span>
                </span>
                <span style={{ color: entry.color, fontWeight: 700 }}>{`${Math.round((entry.value / 10) * 100)}%`}</span>
              </li>
            ))}
          </ul>
        </div>

      {/* Apartado Recibir Amor */}
      <div className="mb-10">
        <h2 className="text-xl font-bold mb-4 text-center text-primary">Recibir amor</h2>
        <div className="bg-base-100 rounded-xl p-6 mb-6 flex flex-col items-center gap-4 shadow">
        <h3 className="text-xl font-bold mb-2 " style={{ color: getLanguageColor(primarioRecibir.categoria) }}>
            Lenguaje principal
          </h3>
          <img src={getLanguageRoutes(primarioRecibir.categoria)} alt={primarioRecibir.categoria} className="object-contain" />
          <h3 className="text-xl font-bold mb-2" style={{ color: getLanguageColor(primarioRecibir.categoria) }}>
            {primarioRecibir.categoria}
          </h3>
          <p className="text-white text-center"><span className="font-semibold"></span> {getLanguageAsset(primarioRecibir.categoria).recibir}</p>
        </div>
        {/* Secundario */}
        <div className="bg-base-100 rounded-xl p-6 flex flex-col items-center gap-4 shadow">
        <h3 className="text-xl font-bold mb-2" style={{ color: getLanguageColor(secundarioRecibir.categoria) }}>
            Lenguaje secundario
          </h3>
          <img src={getLanguageRoutes(secundarioRecibir.categoria)} alt={secundarioRecibir.categoria} className="object-contain" />

          <h3 className="text-xl font-bold mb-2" style={{ color: getLanguageColor(secundarioRecibir.categoria) }}>
            {secundarioRecibir.categoria}
          </h3>
          <p className="text-white text-center"><span className="font-semibold"></span> {getLanguageAsset(secundarioRecibir.categoria).recibir}</p>
        </div>
      </div>

      {/* Apartado Expresar Amor */}
      <div className="mb-10">
        <h2 className="text-xl font-bold mb-4 text-center text-primary">Expresar amor</h2>
        {/* Principal */}
        <div className="bg-base-100 rounded-xl p-6 mb-6 flex flex-col items-center gap-4 shadow">
        <h3 className="text-xl font-bold mb-2" style={{ color: getLanguageColor(primarioExpresar.categoria) }}>
            Lenguaje principal
          </h3>
          <img src={getLanguageRoutes(primarioExpresar.categoria)} alt={primarioExpresar.categoria} className="object-contain" />

          <h3 className="text-xl font-bold mb-2" style={{ color: getLanguageColor(primarioExpresar.categoria) }}>
            {primarioExpresar.categoria}
          </h3>
          <p className="text-white text-center"><span className="font-semibold"></span> {getLanguageAsset(primarioExpresar.categoria).expresar}</p>
        </div>
        {/* Secundario */}
        <div className="bg-base-100 rounded-xl p-6 flex flex-col items-center gap-4 shadow">
        <h3 className="text-xl font-bold mb-2" style={{ color: getLanguageColor(secundarioExpresar.categoria) }}>
            Lenguaje secundario
          </h3>
          <img src={getLanguageRoutes(secundarioExpresar.categoria)} alt={secundarioExpresar.categoria} className="object-contain" />

          <h3 className="text-xl font-bold mb-2" style={{ color: getLanguageColor(secundarioExpresar.categoria) }}>
            {secundarioExpresar.categoria}
          </h3>
          <p className="text-white text-center"><span className="font-semibold"></span> {getLanguageAsset(secundarioExpresar.categoria).expresar}</p>
        </div>
      </div>

      {/* Call to action */}
      <div className="bg-base-100 rounded-xl p-6 flex flex-col items-center gap-4 shadow">
        <h4 className="text-primary text-lg font-bold mb-2 text-center">¿Deseas saber más sobre tus lenguajes de amor?</h4>
        <p className="text-primary-content text-center mb-2">Inscríbete a nuestros talleres y profundiza en el autoconocimiento y tus relaciones.</p>
        <a
          href="https://wa.me/573003105263?text=Hola%2C%20deseo%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20el%20taller%20de%20lenguajes%20de%20amor."
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-accent btn-lg flex items-center gap-2 text-white"
        >
          <FaWhatsapp size={24} className='text-white' />
          Más información
        </a>
      </div>

      {/* Comparar con mi pareja */}
      <div className="bg-base-100 rounded-xl p-6 flex flex-col items-center gap-4 shadow mt-10">
        <h4 className="text-primary text-lg font-bold mb-2 text-center">Comparar con mi pareja</h4>
        <p className="text-primary-content text-center mb-2">Compara tus lenguajes de amor con los de tu pareja y enriquece su relación.</p>
            <div className='flex flex-col gap-3 w-full'>
              <label className='font-semibold text-primary' htmlFor="pareja">Cédula de mi pareja</label>
               <input type="text" name='pareja' className='input input-bordered w-full lg:text-xl' value={cedulaPareja} onChange={(e) => setCedulaPareja(e.target.value)} />
               <button className='btn btn-secondary btn-lg w-1/2 self-center ' onClick={(e) => {
                 e.preventDefault();
                 handleCompareScore(cedulaPareja);
               }}>Comparar</button>
              {errorCedula && <p className='text-error text-center mt-2'>{errorCedula}</p>}
            </div>
      </div>
    </div>
  )
}

export default ResultadosAnalisis