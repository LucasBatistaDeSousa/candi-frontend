const Footer = () => {
  const membros = [
    "Carolina Pichelli Souza",
    "Fernando Alcantara D'Avila",
    "Guilherme Xavier Zanetti",
    "Heloísa Pichelli Souza",
    "Lucas Batista de Sousa",
    "Nuno Kasuo Tronco Yokoji",
    "Vivian de Oliveira Zanon"
  ];

  return (
    <footer className="text-white text-center py-4 mt-auto w-100" style={{ background: 'linear-gradient(90deg, #009688 0%, #263238 100%)' }}>
      <div className="container-fluid">
        <h5 className="fw-bold mb-3">Desenvolvido para a N4 - Projeto Candi </h5>
        <div className="d-flex flex-wrap justify-content-center gap-2 text-light opacity-75" style={{ fontSize: '0.9rem' }}>
          {membros.map((nome, index) => (
            <span key={index}>
              {nome} {index < membros.length - 1 && " • "}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;