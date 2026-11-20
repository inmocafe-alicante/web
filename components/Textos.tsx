import ui from './ui.module.css';

/** Pinta en Terracota lo que va entre asteriscos: «Una cafetería dentro de una *inmobiliaria*». */
export function ConAcento({ texto }: { texto: string }) {
  const partes = texto.split('*');
  return (
    <>
      {partes.map((parte, i) =>
        i % 2 === 1 ? (
          <span key={i} className={ui.acento}>
            {parte}
          </span>
        ) : (
          parte
        ),
      )}
    </>
  );
}
