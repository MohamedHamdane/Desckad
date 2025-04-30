import React, { useState } from 'react';
import './Landing.css';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaGlobe, FaCubes, FaInfoCircle, FaRuler, FaLaptop, FaArchive, FaPalette, FaLock } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';

const Landing = () => {
  const backgroundImage = '/img/background_2.png';
  const [sectionRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Feature cards for second section
  const featureCards = [
    {
      icon: <FaGlobe size={32} color="#37abc8" />,
      title: 'Navigation Immersive',
      content: 'Naviguez librement dans des environnements 3D réalistes.'
    },
    {
      icon: <FaCubes size={32} color="#216778" />,
      title: 'Vue à 360°',
      content: 'Visualisez les bâtiments sous tous les angles.'
    },
    {
      icon: <FaInfoCircle size={32} color="#37abc8" />,
      title: 'Infos Intégrées',
      content: 'Accédez à des données techniques intégrées aux maquettes.'
    }
  ];

  // Solution cards for third section
  const solutionCards = [
    {
      title: "1-Compréhension améliorée",
      text: "Fini les plans 2D complexes : place à l'exploration intuitive en 3D."
    },
    {
      title: "2-Centralisation des infos",
      text: "Accédez à plans, documents, photos et historiques depuis la maquette."
    },
    {
      title: "3-Valorisation des biens",
      text: "Séduisez investisseurs, acheteurs et partenaires par une visualisation immersive."
    },
    {
      title: "4-Gestion facilitée",
      text: "Un accès rapide aux données clés pour une maintenance efficace."
    },
    {
      title: "5-Préservation du patrimoine",
      text: "Gardez une trace vivante et détaillée des bâtiments existants."
    },
  ];

  const services = [
    {
      title: "Numérisation 3D du bâti",
      description: "Par scan laser, photogrammétrie ou modélisation manuelle.",
      icon: <FaRuler />
    },
    {
      title: "Création de maquettes interactives",
      description: "Intégrant vues, déplacements libres, annotations, fiches techniques.",
      icon: <FaLaptop />
    },
    {
      title: "Centralisation documentaire",
      description: "Ajout de plans, certificats, diagnostics, historiques au sein de la maquette.",
      icon: <FaArchive />
    },
    {
      title: "Personnalisation des interfaces",
      description: "Branding, sur-mesure pour agences, collectivités ou institutions.",
      icon: <FaPalette />
    },
    {
      title: "Déploiement et hébergement sécurisé",
      description: "Accès simple par lien web, sans installation.",
      icon: <FaLock />
    }
  ];

  const cardWidth = 240;
  const cardOverlap = 120;
  const totalWidth = (services.length - 1) * (cardWidth - cardOverlap) + cardWidth;

  // Animation variants
  const animations = [
    { x: -100, opacity: 0 },
    { y: -100, opacity: 0 },
    { x: 100, opacity: 0 }
  ];

  // Card slider state and controls
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevCard = () => {
    setCurrentIndex(prev => (prev === 0 ? solutionCards.length - 1 : prev - 1));
  };

  const handleNextCard = () => {
    setCurrentIndex(prev => (prev === solutionCards.length - 1 ? 0 : prev + 1));
  };

  // Render function for solution cards
  const renderSolutionCards = () => {
    return solutionCards.map((card, index) => {
      let position = index - currentIndex;
      if (position < -solutionCards.length / 2) position += solutionCards.length;
      if (position > solutionCards.length / 2) position -= solutionCards.length;

      const isActive = position === 0;
      const isLeft = position < 0;
      const isRight = position > 0;

      return (
        <motion.div
          key={index}
          className={`schema-card ${isActive ? 'active' : ''} ${isLeft ? 'left' : ''} ${isRight ? 'right' : ''}`}
          initial={false}
          animate={{
            x: position * 120,
            zIndex: solutionCards.length - Math.abs(position),
            scale: 1 - Math.abs(position) * 0.15,
            opacity: 1 - Math.abs(position) * 0.3,
            filter: `blur(${Math.abs(position) * 1}px)`,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          onClick={() => setCurrentIndex(index)}
        >
          <h3>{card.title}</h3>
          <p>{card.text}</p>
        </motion.div>
      );
    });
  };

  return (
    <>
      {/* Two Column Section */}
      <section className="two-column-section" ref={sectionRef}>
        <motion.div 
          className="video-column"
          initial={{ x: 100, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <video width="640" height="360" autoPlay loop muted className="animation-video">
            <source src="/img/video_conclusion.webm" type="video/mp4" />
            Un problème lors de la lecture de la vidéo...
          </video>
        </motion.div>

        <motion.div 
          className="text-column"
          initial={{ x: -100, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <h1 className="main-heading">Donnez vie à vos projets immobiliers en 3D</h1>
          <h4 className="sub-heading">DesKcad numérise vos projets immobiliers en 3D interactive, centralise vos données techniques et offre une expérience immersive unique pour explorer, gérer et valoriser votre patrimoine.</h4>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="second-section">
        <h1 className="section-title">Découvrez DeskCad</h1>
        <p className="section-subtitle">
          Une plateforme de visualisation 3D interactive pour l'immobilier.
        </p>

        <div className="cards-container">
          {featureCards.map((card, index) => (
            <motion.div
              key={index}
              className="card"
              initial={animations[index % animations.length]}
              whileInView={{ x: 0, y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              viewport={{ once: true }}
            >
              <div className="icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.content}</p>
            </motion.div>
          ))}
        </div>

        <p className="conclusion-text">
          DeskCad transforme une simple maquette numérique en expérience immersive,
          accessible à distance, sur tous supports.
        </p>
      </section>

      {/* Solutions Section with Card Slider */}
      <section className="third-section">
        <motion.h1 
          className="section-title"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          2. Quelle solution DeskCad apporte ?
        </motion.h1>

        <motion.p 
          className="section-subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          DeskCad répond à plusieurs défis majeurs rencontrés dans le domaine immobilier et patrimonial :
        </motion.p>

        <div className="schema-lines"></div>

        <div className="slider-container">
          <button className="nav-button left" onClick={handlePrevCard}>
            <FiChevronLeft size={24} />
          </button>
          
          <div className="cards-stack">
            {renderSolutionCards()}
          </div>

          <button className="nav-button right" onClick={handleNextCard}>
            <FiChevronRight size={24} />
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section className="overlap-cards-section">
        <motion.h1 
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Quels services sont liés à DeskCad ?
        </motion.h1>

        <motion.p 
          className="section-subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          DeskCad propose une gamme de services adaptés aux besoins des professionnels de l'immobilier, du patrimoine et de la construction :
        </motion.p>

        <div className="cards-row-container" style={{ width: `${totalWidth}px` }}>
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="overlap-card"
              initial={{ 
                y: 40,
                opacity: 0.9,
                zIndex: index
              }}
              whileInView={{ 
                y: 40,
                opacity: 1,
                transition: { delay: index * 0.1 }
              }}
              whileHover={{
                y: -60,
                zIndex: 10,
                transition: { duration: 0.3 }
              }}
              viewport={{ once: true }}
              style={{
                left: `${index * (cardWidth - cardOverlap)}px`,
                width: `${cardWidth}px`
              }}
            >
              <div className="card-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Landing;