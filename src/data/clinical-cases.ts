import type { ImageMetadata } from 'astro'
import alejandraSequence from '@/assets/content/clinical-cases/alejandra-secuencia.jpg'
import aliceBMediastinum from '@/assets/content/clinical-cases/alice-b-mediastino.jpg'
import aliceBLungs from '@/assets/content/clinical-cases/alice-b-pulmones.jpg'
import aliceWSequence from '@/assets/content/clinical-cases/alice-w-secuencia.jpg'
import barbaraSequence from '@/assets/content/clinical-cases/barbara-secuencia.jpg'
import lindaSequence from '@/assets/content/clinical-cases/linda-secuencia.jpg'
import susanSequence from '@/assets/content/clinical-cases/susan-secuencia.jpg'

export interface ClinicalCase {
	id: string
	title: string
	summary: string
	narrative: string
	images: Array<{
		src: ImageMetadata
		alt: string
		caption?: string
	}>
}

export const CLINICAL_CASES: ClinicalCase[] = [
	{
		id: 'susan',
		title: 'Adenocarcinoma recurrente de mama derecha con metástasis en pleura, corazón y pulmón',
		summary: 'Paciente de 62 años, Toronto, ON, Canadá.',
		narrative:
			'Aproximadamente 24 meses tras una mastectomía radical modificada por cáncer de mama derecha, la paciente, Susan, tuvo una recurrencia en la cicatriz. Las imágenes A y B muestran el avance de la enfermedad al iniciar la quimioterapia atavistica. En C, la respuesta al tratamiento fue evidente 9 semanas después del inicio de la quimioterapia y se completó tras 6 meses (D). Una tomografía computarizada mostró un tumor metastásico irregular de 5 x 4 cm en la pleura derecha, afectando el pericardio y la pleura izquierda (imagen E). Había además derrames pleurales bilaterales. Una radiografía de tórax a los 6 meses de iniciar la quimioterapia muestra ambos pulmones inflados (F).',
		images: [
			{
				src: susanSequence,
				alt: 'Secuencia clínica de Susan con imágenes A a F de cáncer de mama recurrente y estudios torácicos.',
			},
		],
	},
	{
		id: 'alice-w',
		title: 'Cáncer de mama localmente avanzado, cuatro años después del diagnóstico',
		summary: 'Paciente de 75 años, Regina, SK, Canadá.',
		narrative:
			'La paciente, Alice W., rechazó la mastectomía durante cuatro años tras ser diagnosticada con cáncer de mama izquierda. Imagen A: mama izquierda al iniciar quimioterapia atavistica. B, dos meses de tratamiento; C, cuatro meses; D, seis meses al finalizar la quimioterapia. Imagen E, tomografía computarizada del pecho izquierdo antes de la quimioterapia atavistica (la flecha apunta a la masa tumoral); F, tomografía computarizada al finalizar la quimioterapia atavistica.',
		images: [
			{
				src: aliceWSequence,
				alt: 'Secuencia clínica de Alice W. con imágenes de mama y tomografías antes y después del tratamiento.',
			},
		],
	},
	{
		id: 'alejandra',
		title: 'Adenocarcinoma avanzado e inoperable de mama izquierda con metástasis hepática',
		summary: 'Paciente de 55 años, Torreón, Coahuila, México.',
		narrative:
			'La paciente, Alejandra, se diagnosticó con cáncer de mama izquierda y fue tratada con quimioterapia tradicional. Tras el quinto ciclo de quimioterapia tradicional y sin mejoría, decidió suspenderlo. Usó remedios populares por 12 meses sin mejoría. Se presentó a la clínica con dolor intenso y dificultad respiratoria. La imagen A muestra el seno izquierdo reemplazado por tejido canceroso que invade la pared torácica. La imagen B muestra el estado tras 1 mes de quimioterapia atavistica. Los síntomas de dolor y dificultad para respirar habían disminuido. La imagen C muestra respuesta clínica completa 6 meses tras iniciar quimioterapia atavistica. A los 20 meses (D), había fibrosis y retracción de la piel. Los estudios radiológicos mostraron invasión de tejidos blandos hasta la cavidad pleural, con un derrame pleural izquierdo masivo (E). A los seis meses de tratamiento, la invasión de tejidos blandos y el derrame pleural han desaparecido (F). Un derrame pleural se había compartimentado en el ángulo costofrénico. El derrame fue negativo en malignas. Una metástasis hepática inicial no era visible tras 3 meses de quimioterapia.',
		images: [
			{
				src: alejandraSequence,
				alt: 'Secuencia clínica de Alejandra con imágenes de mama y estudios radiológicos de tórax antes y después del tratamiento.',
			},
		],
	},
	{
		id: 'barbara',
		title: 'Metástasis cerebrales cuatro años después de la extirpación de un melanoma maligno de piel',
		summary: 'Paciente de 56 años, Vancouver, BC, Canadá.',
		narrative:
			'La paciente, Barbara, llegó a urgencias del Vancouver General Hospital tras experimentar convulsiones, pérdida de visión en el ojo izquierdo, confusión y desorientación. Tenía antecedentes de melanoma maligno en el muslo derecho, extirpado hacía cuatro años. Las imágenes A y C muestran resultados de una resonancia de la cabeza: un tumor metastásico en el lóbulo parietal derecho de 3.5 cm x 2.7 cm x 3.2 cm. Otro se observó en el lóbulo occipital izquierdo, midiendo 3.5 cm x 2.3 cm x 2.6 cm, representado en imágenes A y E con flecha “O”. Se encontró un foco metastásico de 7 mm en el hemisferio cerebeloso derecho (flecha “C1” en A y C) y otro de 3 mm en el hemisferio cerebeloso izquierdo (flecha “C2”). La biopsia de un tumor mostró melanoma maligno. La paciente recibió cinco ciclos de radiación a la cabeza y le dieron 3 a 5 meses de sobrevida, sin tratamiento paliativo adicional. Los tumores metastásicos desaparecieron 3 meses tras iniciar la quimioterapia. Las imágenes de resonancia magnética B, D, F y H se obtuvieron un mes tras finalizar la quimioterapia.',
		images: [
			{
				src: barbaraSequence,
				alt: 'Secuencia de resonancias magnéticas de Barbara con lesiones metastásicas cerebrales identificadas con flechas.',
			},
		],
	},
	{
		id: 'linda',
		title: 'Cáncer de mama triple negativo, segunda recurrencia local y progresión durante quimioterapia tradicional',
		summary: 'Paciente de 64 años, Mississauga, ON, Canadá.',
		narrative:
			'La paciente, Linda, se diagnosticó con cáncer de mama derecha y el tejido tumoral fue negativo para receptores de estrógeno, progesterona y Her2/neu (triple negativo). Tras una lumpectomía, recibió quimioterapia y radioterapia, pero 12 meses después tuvo recurrencia local del cáncer, por lo que se sometió a una mastectomía radical modificada. Dos meses después, se detectó una segunda recurrencia local en la cicatriz. Se inició quimioterapia paliativa. Cuando el tumor progresó a pesar de la quimioterapia tradicional, la paciente se inscribió en nuestro programa de quimioterapia atavistica. La imagen A muestra islas de tejido maligno vascularizado invadiendo la piel y la cicatriz quirúrgica antes de la quimioterapia. La imagen B muestra lesiones pálidas y secas con vesículas, 3 días después del inicio de la quimioterapia atavistica. A los diez días de quimioterapia, C, los tumores se habían aplanado y el tejido superficial comenzó a desprenderse. La imagen D es tres meses tras iniciar la quimioterapia; la piel parece casi normal y hay tejido cicatricial.',
		images: [
			{
				src: lindaSequence,
				alt: 'Secuencia clínica de Linda con imágenes de la recurrencia local de mama en distintos momentos.',
			},
		],
	},
	{
		id: 'alice-b',
		title: 'Metástasis de melanoma maligno en ganglios linfáticos del mediastino y pulmones',
		summary: 'Paciente de 53 años, Toronto, ON, Canadá.',
		narrative:
			'La paciente, Alice B., fue diagnosticada con melanoma maligno en la piel de la oreja derecha. Seis meses después de la extirpación quirúrgica del segmento afectado de la oreja, notó un bulto en el cuello derecho, que resultó ser tumores metastásicos de melanoma en los ganglios linfáticos cervicales. Tras una cirugía radical del cuello, comenzó inmunoterapia con interferón alfa y posteriormente con ipilimumab. Posteriormente, se encontraron metástasis en los ganglios linfáticos del mediastino y en los pulmones. La paciente ingresó en nuestro programa de quimioterapia atavistica en 2013. Las imágenes A, C y E son de una tomografía de tórax antes de iniciar quimioterapia atavistica, que muestran ganglios linfáticos colonizados por células cancerosas (las flechas señalan las lesiones). Las imágenes B, D y F muestran los resultados tras la quimioterapia atavistica. Las lesiones en los ganglios linfáticos mediastinales habían disminuido ligeramente de tamaño, pero se habían calcificado, formando “calcificación en cáscara de huevo” (flechas en los insertos). Se deben comparar simultáneamente con las secciones en las imágenes A, C y E antes del tratamiento. Las calcificaciones en cáscaras de huevo indican que el tejido ha muerto y degenerado. En medicina, se conoce como calcificación distrófica. El segundo conjunto muestra lesiones pulmonares antes del tratamiento en la columna izquierda, señaladas con flechas amarillas, y la eliminación de las metástasis pulmonares en la columna derecha.',
		images: [
			{
				src: aliceBMediastinum,
				alt: 'Tomografías de tórax de Alice B. con lesiones mediastinales y comparaciones posteriores al tratamiento.',
			},
			{
				src: aliceBLungs,
				alt: 'Tomografías de tórax de Alice B. con lesiones pulmonares antes y después del tratamiento.',
			},
		],
	},
]
