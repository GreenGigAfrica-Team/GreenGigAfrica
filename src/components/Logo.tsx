import logoSrc from '../assets/logo.PNG';

export default function Logo() {
  return (
    <img
      src={logoSrc}
      alt="GreenGig Africa"
      style={{
        width: 150,
        filter: 'brightness(0) invert(1)',
      }}
    />
  );
}
