import moment from 'moment';

export const segundosAMinutos = (segundos: number): string => {
  const duracion = moment.duration(segundos, 'seconds');
  const minutos = duracion.minutes();
  const segundosRestantes = duracion.seconds();
  return `${minutos} minutos y ${segundosRestantes} segundos`;
};
