import Particles from "react-tsparticles"

const BackgroundParticles = () => {
  return (
    <Particles
      options={{
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },

            onHover:{
              enable:true,
              mode:"repulse"
            },

            resize: true,
          },
          modes: {

            push: {
              quantity: 2,
            },

          },
        },
        particles: {
          color: {
            value: "#ffffff",
          },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.2,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outMode: "bounce",
            random: false,
            speed: 5,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 1000,
            },
            value: 100,
          },
          opacity: {
            value: 0.4,
          },
          shape: {
            type: "circle",

          },
          size: {
            random: true,
            value: 5,
          },
        },

      }} />
  )
}

export default BackgroundParticles