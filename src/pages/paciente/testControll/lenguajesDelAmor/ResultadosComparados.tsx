import { useLocation } from "react-router-dom"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts'
import { FaWhatsapp } from 'react-icons/fa'
import NavBar from "../../../../components/NavBar"
import { renderCustomLegend, type ChartData } from "./UtilsLengujaesDeamor"


const COLORS: string[] = ['#6366f1', '#f472b6', '#facc15', '#34d399', '#60a5fa']
const languageKeys = [
  'Palabras de afirmación',
  'Actos de servicio',
  'Regalos',
  'Tiempo de calidad',
  'Contacto físico (Kinestésico)'
] as const

type LanguageKey = typeof languageKeys[number]


interface LanguageScore {
  categoria: LanguageKey;
  recibirAmor: number;
  expresarAmor: number;
}

interface UserTestResults {
  id: string;
  nombre: string;
  cedula: string;
  scores: LanguageScore[];
}

const languageRouteImg: Record<LanguageKey, string> = {
  'Palabras de afirmación': "/img/resultado-afirmacion.png",
  'Actos de servicio': "/img/resultado-servicios.png",
  'Regalos': "/img/resultado-regalos.png",
  'Tiempo de calidad': "/img/resultado-tiempo.png",
  'Contacto físico (Kinestésico)': "/img/resultado-contacto.png"
}

function getLanguageColor(categoria: string): string {
  const idx = languageKeys.indexOf(categoria as LanguageKey)
  return COLORS[idx] || COLORS[0]
}
function getLanguageRoutes(categoria: string): string {
  return languageRouteImg[categoria as LanguageKey]
}

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

const ResultadosComparados = () => {
  const location = useLocation();
  // Recibe { user, partner } en location.state
  const { user, partner }: { user?: UserTestResults, partner?: UserTestResults } = location.state.partnerResults || {};

  console.log('location.state', location.state);
  const userTest: UserTestResults | undefined = user;
  const partnerTest: UserTestResults | undefined = partner;

  if (!userTest || !partnerTest) {
    return <div className="text-center text-error py-8">No hay resultados para comparar</div>;
  }

  const getChartData = (scores: LanguageScore[], key: 'recibirAmor' | 'expresarAmor'): ChartData[] =>
    scores.map((score, i) => ({ name: score.categoria, value: score[key], color: COLORS[i] }));

  const recibirDataUsuario = getChartData(userTest.scores, 'recibirAmor');
  const recibirDataPareja = getChartData(partnerTest.scores, 'recibirAmor');
  const expresarDataUsuario = getChartData(userTest.scores, 'expresarAmor');
  const expresarDataPareja = getChartData(partnerTest.scores, 'expresarAmor');

  // Lenguajes principales
  const lenguajePrincipalRecibirUsuario = [...userTest.scores].sort((a, b) => b.recibirAmor - a.recibirAmor)[0];
  const lenguajePrincipalRecibirPareja = [...partnerTest.scores].sort((a, b) => b.recibirAmor - a.recibirAmor)[0];
  const lenguajePrincipalExpresarUsuario = [...userTest.scores].sort((a, b) => b.expresarAmor - a.expresarAmor)[0];
  const lenguajePrincipalExpresarPareja = [...partnerTest.scores].sort((a, b) => b.expresarAmor - a.expresarAmor)[0];

  // Responsive
  const chartHeight = 350;
  const outerRadius = 120;

  

  return (
    <div className="container mx-auto px-2 py-6 max-w-2xl">
      <div className='my-8 px-8'>
        <NavBar />
      </div>
      <h1 className="text-2xl md:text-3xl font-bold text-primary text-center mb-8">Comparativa de Resultados</h1>
      <div className="flex flex-col gap-10 mb-10">
        {/* Pie Chart Recibir Amor */}
        <div className="bg-base-200 rounded-xl p-6 flex flex-col items-center shadow">
          <h2 className="text-primary font-semibold text-lg mb-4">¿Cómo te gusta recibir amor?</h2>
          <div className="w-full flex flex-col md:flex-row gap-8 justify-center items-center">
            <div className="flex flex-col items-center">
              <span className="font-bold text-primary mb-2">Mis resultados</span>
              <ResponsiveContainer width='100%' height={chartHeight}>
                <PieChart>
                  <Pie
                    data={recibirDataUsuario}
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
                    {recibirDataUsuario.map((entry, idx) => (
                      <Cell key={`cell-recibir-user-${idx}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              {renderCustomLegend(recibirDataUsuario)}
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold text-secondary mb-2">Resultados de {partner?.nombre}</span>
              <ResponsiveContainer width='100%' height={chartHeight}>
                <PieChart>
                  <Pie
                    data={recibirDataPareja}
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
                    {recibirDataPareja.map((entry, idx) => (
                      <Cell key={`cell-recibir-pareja-${idx}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              {renderCustomLegend(recibirDataPareja)}
            </div>
          </div>
        </div>
        {/* Bar Chart Recibir Amor */}
        <div className="bg-base-200 rounded-xl p-6 flex flex-col items-center shadow">
          <h2 className="text-primary font-semibold text-lg mb-4">Resultados Detallados Recibir Amor</h2>
          <div className="w-full flex flex-col md:flex-row gap-8 justify-center items-center">
              <span className="font-bold text-primary mb-2">Mis resultados</span>
              <ResponsiveContainer width='100%' height={chartHeight}>
                <BarChart
                  data={recibirDataUsuario}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <Tooltip />
                  <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={30}>
                    {recibirDataUsuario.map((entry, idx) => (
                      <Cell key={`bar-cell-user-${idx}`} fill={entry.color} />
                    ))}
                  </Bar>
                  <XAxis type="number" domain={[0, 10]} hide />
                  <YAxis type="category" dataKey="name" width={150} tick={{ fill: '#fff', fontWeight: 600 }} />
                </BarChart>
              </ResponsiveContainer>
              <ul className="w-full flex flex-col gap-2 mt-4">
            {recibirDataUsuario.map((entry, idx) => (
              <li key={`legend-bar-${idx}`} className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span style={{ background: entry.color, width: 16, height: 16, display: 'inline-block', borderRadius: 4 }}></span>
                  <span style={{ color: entry.color, fontWeight: 600 }}>{entry.name}</span>
                </span>
                <span style={{ color: entry.color, fontWeight: 700 }}>{`${Math.round((entry.value / 10) * 100)}%`}</span>
              </li>
            ))}
          </ul>
              <span className="font-bold text-secondary mb-2">Resultados de {partner?.nombre}</span>
              <ResponsiveContainer width='100%' height={chartHeight}>
                <BarChart
                  data={recibirDataPareja}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <Tooltip />
                  <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={30}>
                    {recibirDataPareja.map((entry, idx) => (
                      <Cell key={`bar-cell-pareja-${idx}`} fill={entry.color} />
                    ))}
                  </Bar>
                  <XAxis type="number" domain={[0, 10]} hide />
                  <YAxis type="category" dataKey="name" width={150} tick={{ fill: '#fff', fontWeight: 600 }} />
                </BarChart>
              </ResponsiveContainer>
              <ul className="w-full flex flex-col gap-2 mt-4">
            {recibirDataPareja.map((entry, idx) => (
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
        </div>
        {/* Pie Chart Expresar Amor */}
        <div className="bg-base-200 rounded-xl p-6 flex flex-col items-center shadow">
          <h2 className="text-primary font-semibold text-lg mb-4">¿Cómo te gusta expresar amor?</h2>
          <div className="w-full flex flex-col md:flex-row gap-8 justify-center items-center">
            <div className="flex flex-col items-center">
              <span className="font-bold text-primary mb-2">Mis resultados</span>
              <ResponsiveContainer width='100%' height={chartHeight}>
                <PieChart>
                  <Pie
                    data={expresarDataUsuario}
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
                    {expresarDataUsuario.map((entry, idx) => (
                      <Cell key={`cell-expresar-user-${idx}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              {renderCustomLegend(expresarDataUsuario)}
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold text-secondary mb-2">Resultados de {partner?.nombre}</span>
              <ResponsiveContainer width='100%' height={chartHeight}>
                <PieChart>
                  <Pie
                    data={expresarDataPareja}
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
                    {expresarDataPareja.map((entry, idx) => (
                      <Cell key={`cell-expresar-pareja-${idx}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              {renderCustomLegend(expresarDataPareja)}
            </div>
          </div>
        </div>
        {/* Bar Chart Expresar Amor */}
        <div className="bg-base-200 rounded-xl p-6 flex flex-col items-center shadow">
          <h2 className="text-primary font-semibold text-lg mb-4">Resultados Detallados Expresar Amor</h2>
          <div className="w-full flex flex-col md:flex-row gap-8 justify-center items-center">
              <span className="font-bold text-primary mb-2">Mis resultados</span>
              <ResponsiveContainer width='100%' height={chartHeight}>
                <BarChart
                  data={expresarDataUsuario}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <Tooltip />
                  <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={30}>
                    {expresarDataUsuario.map((entry, idx) => (
                      <Cell key={`bar-cell-exp-user-${idx}`} fill={entry.color} />
                    ))}
                  </Bar>
                  <XAxis type="number" domain={[0, 10]} hide />
                  <YAxis type="category" dataKey="name" width={150} tick={{ fill: '#fff', fontWeight: 600 }} />
                </BarChart>
              </ResponsiveContainer>
              <ul className="w-full flex flex-col gap-2 mt-4">
            {expresarDataUsuario.map((entry, idx) => (
              <li key={`legend-bar-${idx}`} className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span style={{ background: entry.color, width: 16, height: 16, display: 'inline-block', borderRadius: 4 }}></span>
                  <span style={{ color: entry.color, fontWeight: 600 }}>{entry.name}</span>
                </span>
                <span style={{ color: entry.color, fontWeight: 700 }}>{`${Math.round((entry.value / 10) * 100)}%`}</span>
              </li>
            ))}
          </ul>
              <span className="font-bold text-secondary mb-2">Resultados de {partner?.nombre}</span>
              <ResponsiveContainer width='100%' height={chartHeight}>
                <BarChart
                  data={expresarDataPareja}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <Tooltip />
                  <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={30}>
                    {expresarDataPareja.map((entry, idx) => (
                      <Cell key={`bar-cell-exp-pareja-${idx}`} fill={entry.color} />
                    ))}
                  </Bar>
                  <XAxis type="number" domain={[0, 10]} hide />
                  <YAxis type="category" dataKey="name" width={150} tick={{ fill: '#fff', fontWeight: 600 }} />
                </BarChart>
              </ResponsiveContainer>
              <ul className="w-full flex flex-col gap-2 mt-4">
            {expresarDataPareja.map((entry, idx) => (
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
        </div>
        {/* Lenguaje principal para recibir amor */}
        <div className="mb-10 flex flex-col md:flex-row gap-8 justify-center items-center">
          <div className="bg-base-100 rounded-xl p-6 flex flex-col items-center gap-4 shadow w-full md:w-1/2">
            <h3 className="text-xl font-bold mb-2" style={{ color: getLanguageColor(lenguajePrincipalRecibirUsuario.categoria) }}>Mi lenguaje principal para recibir amor</h3>
            <img src={getLanguageRoutes(lenguajePrincipalRecibirUsuario.categoria)} alt={lenguajePrincipalRecibirUsuario.categoria} className="object-contain" />
            <h3 className="text-xl font-bold mb-2" style={{ color: getLanguageColor(lenguajePrincipalRecibirUsuario.categoria) }}>{lenguajePrincipalRecibirUsuario.categoria}</h3>
            <p className="text-white text-center">{languageAssets[lenguajePrincipalRecibirUsuario.categoria].recibir}</p>
          </div>
          <div className="bg-base-100 rounded-xl p-6 flex flex-col items-center gap-4 shadow w-full md:w-1/2">
            <h3 className="text-xl font-bold mb-2" style={{ color: getLanguageColor(lenguajePrincipalRecibirPareja.categoria) }}>Lenguaje principal de mi pareja para recibir amor</h3>
            <img src={getLanguageRoutes(lenguajePrincipalRecibirPareja.categoria)} alt={lenguajePrincipalRecibirPareja.categoria} className="object-contain" />
            <h3 className="text-xl font-bold mb-2" style={{ color: getLanguageColor(lenguajePrincipalRecibirPareja.categoria) }}>{lenguajePrincipalRecibirPareja.categoria}</h3>
            <p className="text-white text-center">{languageAssets[lenguajePrincipalRecibirPareja.categoria].recibir}</p>
          </div>
        </div>
        {/* Lenguaje principal para expresar amor */}
        <div className="mb-10 flex flex-col md:flex-row gap-8 justify-center items-center">
          <div className="bg-base-100 rounded-xl p-6 flex flex-col items-center gap-4 shadow w-full md:w-1/2">
            <h3 className="text-xl font-bold mb-2" style={{ color: getLanguageColor(lenguajePrincipalExpresarUsuario.categoria) }}>Mi lenguaje principal para expresar amor</h3>
            <img src={getLanguageRoutes(lenguajePrincipalExpresarUsuario.categoria)} alt={lenguajePrincipalExpresarUsuario.categoria} className="object-contain" />
            <h3 className="text-xl font-bold mb-2" style={{ color: getLanguageColor(lenguajePrincipalExpresarUsuario.categoria) }}>{lenguajePrincipalExpresarUsuario.categoria}</h3>
            <p className="text-white text-center">{languageAssets[lenguajePrincipalExpresarUsuario.categoria].expresar}</p>
          </div>
          <div className="bg-base-100 rounded-xl p-6 flex flex-col items-center gap-4 shadow w-full md:w-1/2">
            <h3 className="text-xl font-bold mb-2" style={{ color: getLanguageColor(lenguajePrincipalExpresarPareja.categoria) }}>Lenguaje principal de mi pareja para expresar amor</h3>
            <img src={getLanguageRoutes(lenguajePrincipalExpresarPareja.categoria)} alt={lenguajePrincipalExpresarPareja.categoria} className="object-contain" />
            <h3 className="text-xl font-bold mb-2" style={{ color: getLanguageColor(lenguajePrincipalExpresarPareja.categoria) }}>{lenguajePrincipalExpresarPareja.categoria}</h3>
            <p className="text-white text-center">{languageAssets[lenguajePrincipalExpresarPareja.categoria].expresar}</p>
          </div>
        </div>
        {/* Apartado WhatsApp */}
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
      </div>
    </div>
  )
}

export default ResultadosComparados