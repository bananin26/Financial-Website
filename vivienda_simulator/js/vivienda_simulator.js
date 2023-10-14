// Obtener el ID de usuario de la URL
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('userId');

// Hacer una solicitud a la ruta /userInfo/:userId para obtener la información del usuario
fetch('http://localhost:3000/userInfo/' + userId)
 .then(response => {
 return response.json();
 })
 .then(data => {
 // Actualizar el contenido del elemento h5 con el nombre del usuario
 const nameParts = data.nombre.split(' ');
 document.querySelector('.profile h5').textContent = nameParts[0];
 document.querySelector('.profile-photo img').src = data.profileImage;
 });

// Agregar el ID del usuario como un parámetro de consulta a cada enlace en la página
const links = document.querySelectorAll('a');
links.forEach(link => {
  // Verificar si el enlace ya contiene un parámetro userId
  const linkUrlParams = new URLSearchParams(link.search);
  if (!linkUrlParams.has('userId')) {
    // Si el enlace no contiene un parámetro userId, agregar uno
    if (link.href.indexOf('?') === -1) {
      link.href = link.href + '?userId=' + userId;
    } else {
      link.href = link.href + '&userId=' + userId;
    }
  }
});

// Obtener todos los enlaces <a> en la barra lateral
const sidebarLinks = document.querySelectorAll('.sidebar a');

// Obtener el elemento con la clase "middle"
const middleElement = document.querySelector('.middle');
const secondOperationElement = document.querySelector('.second_operation');
const scheduleElement = document.querySelector('.schedule')

//Al iniciar la pagina los estilos de todos son bloqueados menos el middleElement
middleElement.style.display = 'block';
secondOperationElement.style.display = 'none';
scheduleElement.style.display = 'none';

// show or hide sidebar
const menuBtn = document.querySelector('#menu-btn');
const closeBtn = document.querySelector('#close-btn');
const sidebar = document.querySelector('aside');

menuBtn.addEventListener('click', () => {
    sidebar.style.display = 'block';
})

closeBtn.addEventListener('click', () => {
    sidebar.style.display = 'none';
})

// change theme
const themeBtn = document.querySelector('.theme-btn');
// Obtener el elemento <img> del logotipo
const logoImg = document.querySelector('.logo');

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');

    themeBtn.querySelector('span:first-child').classList.toggle('active');
    themeBtn.querySelector('span:last-child').classList.toggle('active');

    // Verificar si el cuerpo del documento tiene la clase "dark-theme"
    if (document.body.classList.contains('dark-theme')) {
      // Cambiar el atributo src del elemento <img> del logotipo a la imagen del tema oscuro
      logoImg.src = './images/logo2.png';
    } else {
      // Cambiar el atributo src del elemento <img> del logotipo a la imagen del tema claro
      logoImg.src = './images/logo.png';
    }
})

let cambiosGuardados = true;

const enlaces = document.querySelectorAll('a');

let enlaceSeleccionado = null;

enlaces.forEach((enlace) => {
    enlace.addEventListener('click', (event) => {
      if (!cambiosGuardados) {
        event.preventDefault();
        enlaceSeleccionado = event.currentTarget;
        Swal.fire({
          title: '¿Estás seguro que quieres salir?',
          text: "Los cambios no se guardarán",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, salir'
        }).then((result) => {
          if (result.isConfirmed) {
            let formularioActivo = null;
            if (secondOperationElement.style.display === 'block') {
              formularioActivo = document.querySelector('#simulator-form');
            }
            
            // Restablecer los campos del formulario activo
            if (formularioActivo) {
              formularioActivo.reset();
            }
            
            cambiosGuardados = true;
            enlaceSeleccionado.click();
          }
        })
      } else {
        // Eliminar la clase "active" del enlace <a> actualmente activo
        document.querySelector('.sidebar a.active').classList.remove('active');
        // Agregar la clase "active" al enlace <a> que se hizo clic
        event.currentTarget.classList.add('active');
  
        // Verificar si se hizo clic en el enlace "Informations"
        if (event.currentTarget.querySelector('h4').textContent === 'Information') {
          // Mostrar el elemento con la clase "middle"
          middleElement.style.display = 'block';
          secondOperationElement.style.display = 'none';
          scheduleElement.style.display = 'none';
        }
  
        // Verificar si se hizo clic en el enlace "Simulator"
        if (event.currentTarget.querySelector('h4').textContent === 'Schedule') {
          // Mostrar el elemento con la clase "middle"
          middleElement.style.display = 'none';
          secondOperationElement.style.display = 'none'; 
          scheduleElement.style.display =' block';
        }
      }
    });
  });
  

const inputs = document.querySelectorAll('input, select');
inputs.forEach((input) => {
  input.addEventListener('change', () => {
    cambiosGuardados = false;
  });
});


// Objeto que contiene información sobre todas las viviendas
const viviendas = {
  1: {
      nombre: 'QUARZO',
      descripcion: 'Amplio departamento en Jesús María cuenta con dos habitaciones generosas, encontrarás suficiente espacio para acomodar a tu familia o aprovecharlo como una oficina en casa. Cada habitación ofrece comodidad y privacidad, mientras que los amplios ventanales permiten la entrada de luz natural, creando un ambiente luminoso y acogedor.',
      habitaciones: 2,
      banos: 1,
      ciudad: 'Lima',
      direccion: 'Jesús María (Av. Cuba 538)',
      tipo: 'Departamento',
      area: 68,
      precio: 339900,
      imagenes: [
        '/vivienda_simulator/images/viviendas/vivienda1/vivienda1_1.jpg',
        '/vivienda_simulator/images/viviendas/vivienda1/vivienda1_2.jpg',
        '/vivienda_simulator/images/viviendas/vivienda1/vivienda1_3.jpg',
        '/vivienda_simulator/images/viviendas/vivienda1/vivienda1_4.jpg',
        '/vivienda_simulator/images/viviendas/vivienda1/vivienda1_5.jpg',
        '/vivienda_simulator/images/viviendas/vivienda1/vivienda1_6.jpg',
        '/vivienda_simulator/images/viviendas/vivienda1/vivienda1_7.jpg',
        '/vivienda_simulator/images/viviendas/vivienda1/vivienda1_8.jpg',
        '/vivienda_simulator/images/viviendas/vivienda1/vivienda1_9.jpg',
        '/vivienda_simulator/images/viviendas/vivienda1/vivienda1_10.jpg',
        '/vivienda_simulator/images/viviendas/vivienda1/vivienda1_11.jpg',
        '/vivienda_simulator/images/viviendas/vivienda1/vivienda1_12.jpg'
      ]
  },
  2: {
    nombre: 'BREZZO',
    descripcion: 'Descubre la elegancia de este moderno departamento en Miraflores. Con sus amplios espacios, ubicación privilegiada y comodidades de lujo, es el lugar perfecto para vivir. Disfruta de una vida sofisticada rodeado de restaurantes, tiendas y hermosos paisajes. ¡Haz de este departamento tu nuevo hogar en Miraflores!',
    habitaciones: 2,
    banos: 1,
    ciudad: 'Lima',
    direccion: 'San Antonio - Miraflores (Calle José Gabriel Chariarse 885)',
    tipo: 'Departamento',
    area: 97.10,
    precio: 291500,
    imagenes: [
      '/vivienda_simulator/images/viviendas/vivienda2/vivienda2_1.jpg',
      '/vivienda_simulator/images/viviendas/vivienda2/vivienda2_2.jpg',
      '/vivienda_simulator/images/viviendas/vivienda2/vivienda2_3.jpg',
      '/vivienda_simulator/images/viviendas/vivienda2/vivienda2_4.jpg',
      '/vivienda_simulator/images/viviendas/vivienda2/vivienda2_5.jpg',
      '/vivienda_simulator/images/viviendas/vivienda2/vivienda2_6.jpg',
      '/vivienda_simulator/images/viviendas/vivienda2/vivienda2_7.jpg',
      '/vivienda_simulator/images/viviendas/vivienda2/vivienda2_8.jpg'
    ]
  },
  3: {
    nombre: 'TOP',
    descripcion: 'Proyecto pensado en un estilo vida moderno y dinámico, muy al estilo TOP. Está ubicado en la urbanización La Calera, zona exclusiva de Surquillo, a un paso de Miraflores y San Borja. Frente áreas verdes con ciclovía, rodeada de parques, restaurantes y mini markets.Su excelente ubicación te permitirá tener un rápido acceso a las principales avenidas y estar conectado con cualquier distrito cercano. Con 82 departamentos de 1, 2 y 3 departamentos acompañados con áreas comunes: Lobby, Sala de usos múltiples, sala coworking, gimnasio, zona parrilla, zona pet, zona para niños y relajación; perfectas para el entretenimiento de toda la familia.',
    habitaciones: 2,
    banos: 2,
    ciudad: 'Lima',
    direccion: 'Jorge Chavez, Provincia de Lima, Provincia de Lima',
    tipo: 'Departamento',
    area: 92,
    precio: 293695,
    imagenes: [
      '/vivienda_simulator/images/viviendas/vivienda3/vivienda3_1.jpg',
      '/vivienda_simulator/images/viviendas/vivienda3/vivienda3_2.jpg',
      '/vivienda_simulator/images/viviendas/vivienda3/vivienda3_3.jpg',
      '/vivienda_simulator/images/viviendas/vivienda3/vivienda3_4.jpg',
      '/vivienda_simulator/images/viviendas/vivienda3/vivienda3_5.jpg',
      '/vivienda_simulator/images/viviendas/vivienda3/vivienda3_6.jpg',
      '/vivienda_simulator/images/viviendas/vivienda3/vivienda3_7.jpg',
      '/vivienda_simulator/images/viviendas/vivienda3/vivienda3_8.jpg',
      '/vivienda_simulator/images/viviendas/vivienda3/vivienda3_9.jpg',
      '/vivienda_simulator/images/viviendas/vivienda3/vivienda3_10.jpg',
      '/vivienda_simulator/images/viviendas/vivienda3/vivienda3_11.jpg',
      '/vivienda_simulator/images/viviendas/vivienda3/vivienda3_12.jpg',
      '/vivienda_simulator/images/viviendas/vivienda3/vivienda3_13.jpg',
      '/vivienda_simulator/images/viviendas/vivienda3/vivienda3_14.jpg',
      '/vivienda_simulator/images/viviendas/vivienda3/vivienda3_15.jpg',
      '/vivienda_simulator/images/viviendas/vivienda3/vivienda3_16.jpg',
      '/vivienda_simulator/images/viviendas/vivienda3/vivienda3_17.jpg'
    ]
  },
  4: {
    nombre: 'ETREA',
    descripcion: 'El proyecto cuenta con el respaldo y solidez de Cantabria Inmobiliaria. Áreas comunes alineadas al estilo de vida actual. Cada espacio esta pensado para satisfacer y promover el bienestar en quienes eligen vivir en Etrea Jesús María: Coworking, Sum bar, Lounge vine, Pet Zone, Terraza lounge, Office service, Zona de parrilla, SUM Montessori.',
    habitaciones: 3,
    banos: 1,
    ciudad: 'Lima',
    direccion: 'Provincia de Lima, Provincia de Lima',
    tipo: 'Departamento',
    area: 78,
    precio: 343000,
    imagenes: [
      '/vivienda_simulator/images/viviendas/vivienda4/vivienda4_1.jpg',
      '/vivienda_simulator/images/viviendas/vivienda4/vivienda4_2.jpg',
      '/vivienda_simulator/images/viviendas/vivienda4/vivienda4_3.jpg',
      '/vivienda_simulator/images/viviendas/vivienda4/vivienda4_4.jpg',
      '/vivienda_simulator/images/viviendas/vivienda4/vivienda4_5.jpg',
      '/vivienda_simulator/images/viviendas/vivienda4/vivienda4_6.jpg',
      '/vivienda_simulator/images/viviendas/vivienda4/vivienda4_7.jpg',
      '/vivienda_simulator/images/viviendas/vivienda4/vivienda4_8.jpg',
      '/vivienda_simulator/images/viviendas/vivienda4/vivienda4_9.jpg',
      '/vivienda_simulator/images/viviendas/vivienda4/vivienda4_10.jpg',
      '/vivienda_simulator/images/viviendas/vivienda4/vivienda4_11.jpg',
      '/vivienda_simulator/images/viviendas/vivienda4/vivienda4_12.jpg',
      '/vivienda_simulator/images/viviendas/vivienda4/vivienda4_13.jpg',
      '/vivienda_simulator/images/viviendas/vivienda4/vivienda4_14.jpg',
      '/vivienda_simulator/images/viviendas/vivienda4/vivienda4_15.jpg',
      '/vivienda_simulator/images/viviendas/vivienda4/vivienda4_16.jpg',
      '/vivienda_simulator/images/viviendas/vivienda4/vivienda4_17.jpg'
    ]
  },
  5: {
    nombre: 'DUETTO',
    descripcion: 'Un proyecto multifamiliar en el límite de Cercado de Lima y Pueblo Libre. Cerca de las prinicipales universidades. Depas de 1, 2 y 3 dormitorios con una excelente distribución. Disfruta una vista panorámica al Parque del Buen Remedio. Un proyecto multifamiliar en el límite de Cercado de Lima y Pueblo Libre. Cerca de las principales universidades. Depas de 1, 2 y 3 dormitorios con una excelente distribución. Disfruta una vista panorámica al Parque del Buen Remedio. ¡Disfruta de vivir a un paso de Pueblo Libre! Áreas comunes: Game zone, Piscina, Bike parking, Rooftop BBQ, Karaoke, SUM Bar, Gym Calistenia.',
    habitaciones: 3,
    banos: 2,
    ciudad: 'Lima',
    direccion: 'Pando 3 Etapa, Provincia de Lima, Provincia de Lima',
    tipo: 'Departamento',
    area: 72,
    precio: 244200,
    imagenes: [
      '/vivienda_simulator/images/viviendas/vivienda5/vivienda5_1.jpg',
      '/vivienda_simulator/images/viviendas/vivienda5/vivienda5_2.jpg',
      '/vivienda_simulator/images/viviendas/vivienda5/vivienda5_3.jpg',
      '/vivienda_simulator/images/viviendas/vivienda5/vivienda5_4.jpg',
      '/vivienda_simulator/images/viviendas/vivienda5/vivienda5_5.jpg',
      '/vivienda_simulator/images/viviendas/vivienda5/vivienda5_6.jpg',
      '/vivienda_simulator/images/viviendas/vivienda5/vivienda5_7.jpg',
      '/vivienda_simulator/images/viviendas/vivienda5/vivienda5_8.jpg',
      '/vivienda_simulator/images/viviendas/vivienda5/vivienda5_9.jpg',
      '/vivienda_simulator/images/viviendas/vivienda5/vivienda5_10.jpg',
      '/vivienda_simulator/images/viviendas/vivienda5/vivienda5_11.jpg',
      '/vivienda_simulator/images/viviendas/vivienda5/vivienda5_12.jpg',
      '/vivienda_simulator/images/viviendas/vivienda5/vivienda5_13.jpg',
      '/vivienda_simulator/images/viviendas/vivienda5/vivienda5_14.jpg',
      '/vivienda_simulator/images/viviendas/vivienda5/vivienda5_15.jpg',
      '/vivienda_simulator/images/viviendas/vivienda5/vivienda5_16.jpg',
      '/vivienda_simulator/images/viviendas/vivienda5/vivienda5_17.jpg'
    ]
  },
  6: {
    nombre: 'GARDEN I',
    descripcion: 'Gardenias, Santiago de Surco, zona segura, rodeada de lindos parques, cerca a centros comerciales, colegios y de facil acceso. El Edificio cuenta con departamentos flats, dúplex y triplex con áreas desde 124.30 hasta 201.28 m². Cuenta con una amplia y funcional distribución en sus diferentes niveles, iluminación, ventilación natural y EXCELENTES ACABADOS.  Todos con amplias salas, comedor, medio baño de visita, cocina cerrada con muebles altos, bajos y tableros de granito, patio de lavandería, cuarto y baño de servicio, estar tv familiar, dormitorios con amplios closets, el principal con baño privado, y para el uso de los otros dormitorios un baño secundario. INCLUYE ESTACIONAMIENTO POR DEPARTAMENTO. Los esperamos en nuestra oficina de ventas, ubicada en el mismo proyecto: Calle Batallon Callao Sur N° 364, Urbanización Las Gardenias, Santiago de Surco, todos los días de 9:00 am. a 06:00 pm Altura 49 Av. Benavides.',
    habitaciones: 3,
    banos: 4,
    ciudad: 'Lima',
    direccion: 'Urb las Gardenias Etapa 1, Provincia de Lima, Provincia de Lima ',
    tipo: 'Departamento',
    area: 201,
    precio: 140417,
    imagenes: [
      '/vivienda_simulator/images/viviendas/vivienda6/vivienda6_1.jpg',
      '/vivienda_simulator/images/viviendas/vivienda6/vivienda6_2.jpg',
      '/vivienda_simulator/images/viviendas/vivienda6/vivienda6_3.jpg',
      '/vivienda_simulator/images/viviendas/vivienda6/vivienda6_4.png',
      '/vivienda_simulator/images/viviendas/vivienda6/vivienda6_5.jpg',
      '/vivienda_simulator/images/viviendas/vivienda6/vivienda6_6.png',
      '/vivienda_simulator/images/viviendas/vivienda6/vivienda6_7.jpg',
      '/vivienda_simulator/images/viviendas/vivienda6/vivienda6_8.png',
      '/vivienda_simulator/images/viviendas/vivienda6/vivienda6_9.png'
    ]
  },
  7: {
    nombre: 'S14',
    descripcion: 'S14 APARTMENTS cuenta con espacios optimizados, funcionales, eficientes e independientes de 1,2 y 3 dormitorios. Tiene una excelente ubicación estratégica, cerca al centro financiero, zonas comerciales y centros de estudios. S14 APARTMENTS tiene una arquitectura moderna que se integra al entorno; además de considerarse como un referente de la movilidad urbana por su ubicación cercana a corredores de autobuses, ciclovías y a principales vías. Áreas comunes: Jardin interior, Lobby, Sala de úsos múltiples, Zona de lavandería, Zona de parrillas, otros.',
    habitaciones: 3,
    banos: 2,
    ciudad: 'Lima',
    direccion: 'Ur. Santa Beatriz, Lima, Lima, Lima',
    tipo: 'Departamento',
    area: 136,
    precio: 291211,
    imagenes: [
      '/vivienda_simulator/images/viviendas/vivienda7/vivienda7_1.jpg',
      '/vivienda_simulator/images/viviendas/vivienda7/vivienda7_2.jpg',
      '/vivienda_simulator/images/viviendas/vivienda7/vivienda7_3.jpg',
      '/vivienda_simulator/images/viviendas/vivienda7/vivienda7_4.jpg',
      '/vivienda_simulator/images/viviendas/vivienda7/vivienda7_5.jpg',
      '/vivienda_simulator/images/viviendas/vivienda7/vivienda7_6.jpg',
      '/vivienda_simulator/images/viviendas/vivienda7/vivienda7_7.jpg',
      '/vivienda_simulator/images/viviendas/vivienda7/vivienda7_8.jpg',
      '/vivienda_simulator/images/viviendas/vivienda7/vivienda7_9.jpg',
      '/vivienda_simulator/images/viviendas/vivienda7/vivienda7_10.jpg',
      '/vivienda_simulator/images/viviendas/vivienda7/vivienda7_11.jpg',
      '/vivienda_simulator/images/viviendas/vivienda7/vivienda7_12.jpg',
      '/vivienda_simulator/images/viviendas/vivienda7/vivienda7_13.jpg',
      '/vivienda_simulator/images/viviendas/vivienda7/vivienda7_14.jpg'
    ]
  },
  8: {
    nombre: 'VIVERDI',
    descripcion: '¡Tenemos el DEPA a tu estilo y a tu medida! Depas de 1 y 2 dormitorios equipados con muebles altos y bajos de cocina + cocina encimera y horno empotrado a gas natural + walking clóset en dormitorio principal + luminarias led. ¡Lo mejor de todo! Viverdi cuenta con certificación Edge, 20% ahorro de energía y agua. ',
    habitaciones: 3,
    banos: 4,
    ciudad: 'Lima',
    direccion: 'Santa Cruz, Urb Santa Cruz, Provincia de Lima',
    tipo: 'Departamento',
    area: 202,
    precio: 291107,
    imagenes: [
      '/vivienda_simulator/images/viviendas/vivienda8/vivienda8_1.jpg',
      '/vivienda_simulator/images/viviendas/vivienda8/vivienda8_2.jpg',
      '/vivienda_simulator/images/viviendas/vivienda8/vivienda8_3.jpg',
      '/vivienda_simulator/images/viviendas/vivienda8/vivienda8_4.jpg',
      '/vivienda_simulator/images/viviendas/vivienda8/vivienda8_5.jpg',
      '/vivienda_simulator/images/viviendas/vivienda8/vivienda8_6.jpg'
    ]
  },
  9: {
    nombre: 'VANGUARDIA',
    descripcion: 'Vanguardia es el proyecto inmobiliario hecho a tu medida. Su diseño innovador, espacio amplios y exclusivos acabados . Ubicado estratégicamente cerca de las principales calles y avenidas de la ciudad de Lima, te permitirá estar cerca de todos los servicios que necesitas para llevar el estilo de vida moderna que deseas. Disfruta de exclusivos espacios: Lobby, Sala de juegos para niños, Área de Parrilla con Vista Panorámica, Sala CoBreak, Sala CoWork, Centro de Lavado. Vanguardia cuenta con departamentos de 1 ,2 y 3 dormitorios.',
    habitaciones: 3,
    banos: 3,
    ciudad: 'Lima',
    direccion: 'Sd. S/N, Magdalena del Mar, Lima, Lima ',
    tipo: 'Departamento',
    area: 133,
    precio: 333306,
    imagenes: [
      '/vivienda_simulator/images/viviendas/vivienda9/vivienda9_1.jpg',
      '/vivienda_simulator/images/viviendas/vivienda9/vivienda9_2.jpg',
      '/vivienda_simulator/images/viviendas/vivienda9/vivienda9_3.jpg',
      '/vivienda_simulator/images/viviendas/vivienda9/vivienda9_4.jpg',
      '/vivienda_simulator/images/viviendas/vivienda9/vivienda9_5.jpg',
      '/vivienda_simulator/images/viviendas/vivienda9/vivienda9_6.jpg',
      '/vivienda_simulator/images/viviendas/vivienda9/vivienda9_7.jpg'
    ]
  },
  10: {
    nombre: 'GARDEN II',
    descripcion: 'Edificio "GARDEN ll" de 08 Exclusivos departamentos, proyecto financiado por el BCP, ubicado en la Calle Batallon Callao Sur N° 355, Urbanización Las Gardenias, Santiago de Surco, zona segura, rodeada de lindos parques, cerca a centros comerciales, colegios y de facil acceso. El Edificio cuenta con departamentos flats y dúplex con áreas desde 112.80 hasta 196.90 m². Cuenta con una amplia y funcional distribución en sus diferentes niveles, iluminación, ventilación natural y EXCELENTES ACABADOS. Todos con amplias salas, comedor, medio baño de visita, cocina cerrada con muebles altos, bajos y tableros de granito, patio de lavandería, cuarto y baño de servicio, estar tv familiar, dormitorios con amplios closets, el principal con baño privado, y para el uso de los otros dormitorios un baño secundario. INCLUYE ESTACIONAMIENTO Y DEPOSITO POR DEPARTAMENTO. Los esperamos en nuestra oficina de ventas, ubicada en : Calle Batallon Callao Sur N° 364, Urbanización Las Gardenias, Santiago de Surco, todos los días de 9:00 am. a 06:00 pm Altura 49 Av. Benavides.',
    habitaciones: 3,
    banos: 4,
    ciudad: 'Lima',
    direccion: 'Urb las Gardenias Etapa 1, Provincia de Lima, Provincia de Lima',
    tipo: 'Departamento',
    area: 196,
    precio: 266715,
    imagenes: [
      '/vivienda_simulator/images/viviendas/vivienda10/vivienda10_1.jpg',
      '/vivienda_simulator/images/viviendas/vivienda10/vivienda10_2.jpg',
      '/vivienda_simulator/images/viviendas/vivienda10/vivienda10_3.jpg',
      '/vivienda_simulator/images/viviendas/vivienda10/vivienda10_4.jpg',
      '/vivienda_simulator/images/viviendas/vivienda10/vivienda10_5.jpg',
      '/vivienda_simulator/images/viviendas/vivienda10/vivienda10_6.jpg',
      '/vivienda_simulator/images/viviendas/vivienda10/vivienda10_7.jpg',
      '/vivienda_simulator/images/viviendas/vivienda10/vivienda10_8.jpg'
    ]
  },
  11: {
    nombre: 'GRACIA',
    descripcion: 'Benavides es la principal avenida de Miraflores, que conecta con distintas avenidas, distritos y hasta con el mar. Gracia es un espacio de modernidad para las nuevas generaciones, con diversos parques, restaurantes y lugares de ocio a su alrededor. El departamento cuenta con 1, 2 y 3 dormitorios y con áreas comunes para que puedas compartir con las personas que más quieres. Áreas comunes: Lobby, Sala de niños, Sala de úsos múltiples, Zona de parrillas, Otros.',
    habitaciones: 2,
    banos: 3,
    ciudad: 'Lima',
    direccion: 'Ur. Humboldt, Miraflores, Lima, Lima ',
    tipo: 'Departamento',
    area: 131,
    precio: 288000,
    imagenes: [
      '/vivienda_simulator/images/viviendas/vivienda11/vivienda11_1.jpg',
      '/vivienda_simulator/images/viviendas/vivienda11/vivienda11_2.jpeg',
      '/vivienda_simulator/images/viviendas/vivienda11/vivienda11_3.jpeg',
      '/vivienda_simulator/images/viviendas/vivienda11/vivienda11_4.jpg',
      '/vivienda_simulator/images/viviendas/vivienda11/vivienda11_5.jpg',
      '/vivienda_simulator/images/viviendas/vivienda11/vivienda11_6.jpg',
      '/vivienda_simulator/images/viviendas/vivienda11/vivienda11_7.jpg',
      '/vivienda_simulator/images/viviendas/vivienda11/vivienda11_8.jpg',
      '/vivienda_simulator/images/viviendas/vivienda11/vivienda11_9.jpg',
      '/vivienda_simulator/images/viviendas/vivienda11/vivienda11_10.jpg'
    ]
  },
  12: {
    nombre: 'ZENHAUS',
    descripcion: 'ZENHAUS es un edificio ubicado en una de las mejores zonas de LINCE. VIVE A UN PASO DE SAN ISIDRO y de las principales vías de acceso de la ciudad (Av. Javier Prado y Paseo de la República). Contamos con departamentos de 1, 2 y 3 y áreas comunes pensadas para tu estilo de vida que entregamos 100% equipadas. Acércate a tu trabajo y olvídate de ese tiempo perdido en el trafico, disfruta de los mejores restaurantes, bancos y centros comerciales. Nos esperes más y Vive en modo #ZenHuas',
    habitaciones: 3,
    banos: 2,
    ciudad: 'Lima',
    direccion: 'Ur. San Eugenio, Lince, Lima, Lima',
    tipo: 'Departamento',
    area: 73,
    precio: 341000,
    imagenes: [
      '/vivienda_simulator/images/viviendas/vivienda12/vivienda12_1.jpg',
      '/vivienda_simulator/images/viviendas/vivienda12/vivienda12_2.jpg',
      '/vivienda_simulator/images/viviendas/vivienda12/vivienda12_3.jpg',
      '/vivienda_simulator/images/viviendas/vivienda12/vivienda12_4.jpg',
      '/vivienda_simulator/images/viviendas/vivienda12/vivienda12_5.jpg',
      '/vivienda_simulator/images/viviendas/vivienda12/vivienda12_6.jpg',
      '/vivienda_simulator/images/viviendas/vivienda12/vivienda12_7.jpg',
      '/vivienda_simulator/images/viviendas/vivienda12/vivienda12_8.jpg',
      '/vivienda_simulator/images/viviendas/vivienda12/vivienda12_9.jpg',
      '/vivienda_simulator/images/viviendas/vivienda12/vivienda12_10.jpg',
      '/vivienda_simulator/images/viviendas/vivienda12/vivienda12_11.jpg',
      '/vivienda_simulator/images/viviendas/vivienda12/vivienda12_12.jpg',
      '/vivienda_simulator/images/viviendas/vivienda12/vivienda12_13.jpg',
      '/vivienda_simulator/images/viviendas/vivienda12/vivienda12_14.jpg',
      '/vivienda_simulator/images/viviendas/vivienda12/vivienda12_15.jpg',
      '/vivienda_simulator/images/viviendas/vivienda12/vivienda12_16.jpg'
    ]
  },
  13: {
    nombre: 'REDUCTO',
    descripcion: 'Un nuevo proyecto está por comenzar en Av. Reducto, en una de las zonas más apreciadas de Miraflores. A pasos de restaurantes, cafeterías, bares temáticos, centros comerciales, centros de diversión y más. Un entorno lleno de cultura y arte.',
    habitaciones: 3,
    banos: 3,
    ciudad: 'Lima',
    direccion: 'Ur. Leuro, Miraflores, Lima, Lima ',
    tipo: 'Departamento',
    area: 146,
    precio: 199246,
    imagenes: [
      '/vivienda_simulator/images/viviendas/vivienda13/vivienda13_1.jpg',
      '/vivienda_simulator/images/viviendas/vivienda13/vivienda13_2.jpg',
      '/vivienda_simulator/images/viviendas/vivienda13/vivienda13_3.jpg',
      '/vivienda_simulator/images/viviendas/vivienda13/vivienda13_4.jpg',
      '/vivienda_simulator/images/viviendas/vivienda13/vivienda13_5.jpg',
      '/vivienda_simulator/images/viviendas/vivienda13/vivienda13_6.jpg',
      '/vivienda_simulator/images/viviendas/vivienda13/vivienda13_7.jpg',
      '/vivienda_simulator/images/viviendas/vivienda13/vivienda13_8.jpg',
      '/vivienda_simulator/images/viviendas/vivienda13/vivienda13_9.jpg',
      '/vivienda_simulator/images/viviendas/vivienda13/vivienda13_10.jpg'
    ]
  },
  14: {
    nombre: 'FELIZIA',
    descripcion: 'Es momento de sonreir y tener una vida feliz" Inspirado en fortalecer cada momento de felicidad como ser humano y familia. Felizia es felicidad, es sentirse plenamente satisfecho de lograr tus sueños. Departamentos de 1, 2 y 3 dormitorios con cuotas mensuales accesibles con los beneficios Mivivienda y Bono Verde. Diversas áreas comunes: Gym, SUM, sala lúdica, sala de internet, zona de parrilla, área para estacionamiento común de bicicletas, plazoleta y alamedas laterales. ¡Cotiza hoy para ayudarte a acceder a tu depa propio!',
    habitaciones: 3,
    banos: 2,
    ciudad: 'Lima',
    direccion: 'Ur. La Campiña, Chorrillos, Lima, Lima',
    tipo: 'Departamento',
    area: 76,
    precio: 221404,
    imagenes: [
      '/vivienda_simulator/images/viviendas/vivienda14/vivienda14_1.jpg',
      '/vivienda_simulator/images/viviendas/vivienda14/vivienda14_2.jpg',
      '/vivienda_simulator/images/viviendas/vivienda14/vivienda14_3.jpg',
      '/vivienda_simulator/images/viviendas/vivienda14/vivienda14_4.jpg',
      '/vivienda_simulator/images/viviendas/vivienda14/vivienda14_5.jpg',
      '/vivienda_simulator/images/viviendas/vivienda14/vivienda14_6.jpg',
      '/vivienda_simulator/images/viviendas/vivienda14/vivienda14_7.jpg',
      '/vivienda_simulator/images/viviendas/vivienda14/vivienda14_8.jpg',
      '/vivienda_simulator/images/viviendas/vivienda14/vivienda14_9.jpg',
      '/vivienda_simulator/images/viviendas/vivienda14/vivienda14_10.jpg',
    ]
  },
  15: {
    nombre: 'LUSSO',
    descripcion: 'LUSSO es un proyecto multifamiliar arquitectónico elegante, con acabados de calidad, aprovechando la distribución e iluminación natural, perfecto para cualquier estilo de vida e iniciar el hogar deseado. Ubicación perfecta para disfrutar de una vida tranquila y segura, con rápido acceso a las principales avenidas que te permite una fácil conexión entre San Isidro y Miraflores. El proyecto LUSSO cuenta con 06 niveles y un total de 38 departamentos Flats desde 67.27 m2 hasta 202.87 m2.',
    habitaciones: 3,
    banos: 2,
    ciudad: 'Lima',
    direccion: 'Sd. S/N, Magdalena del Mar, Lima, Lima ',
    tipo: 'Departamento',
    area: 94,
    precio: 290696,
    imagenes: [
      '/vivienda_simulator/images/viviendas/vivienda15/vivienda15_1.jpeg',
      '/vivienda_simulator/images/viviendas/vivienda15/vivienda15_2.jpeg',
      '/vivienda_simulator/images/viviendas/vivienda15/vivienda15_3.jpeg',
      '/vivienda_simulator/images/viviendas/vivienda15/vivienda15_4.jpeg',
      '/vivienda_simulator/images/viviendas/vivienda15/vivienda15_5.jpeg',
      '/vivienda_simulator/images/viviendas/vivienda15/vivienda15_6.jpeg',
      '/vivienda_simulator/images/viviendas/vivienda15/vivienda15_7.jpeg',
      '/vivienda_simulator/images/viviendas/vivienda15/vivienda15_8.jpeg',
      '/vivienda_simulator/images/viviendas/vivienda15/vivienda15_9.jpeg',
      '/vivienda_simulator/images/viviendas/vivienda15/vivienda15_10.jpeg',
      '/vivienda_simulator/images/viviendas/vivienda15/vivienda15_11.jpeg',
      '/vivienda_simulator/images/viviendas/vivienda15/vivienda15_12.jpeg',
      '/vivienda_simulator/images/viviendas/vivienda15/vivienda15_13.jpeg',
      '/vivienda_simulator/images/viviendas/vivienda15/vivienda15_14.jpeg',
    ]
  },
  16: {
    nombre: 'SCHELL',
    descripcion: 'El proyecto “Schell” está ubicado estratégicamente en la esquina de las calles Schell y Grimaldo del Solar, en la zona más céntrica y “vibrante” del distrito de Miraflores, cercano a restaurantes, tiendas y de muy fácil acceso a través de las principales vías del distrito. Edificio diseñado y construido bajo las normas de sostenibilidad ambiental con certificación Edge, que contará con intervenciones de bioclimática para mejorar la calidad ambiental interior de los departamentos y zonas comunes. 5 sótanos de estacionamientos individuales. Amenities: Lobby, coworking, gimnasio, sala lounge, zona de BBQ, lavandería, bicicletario, pet spa. Los departamentos contarán con cocina equipada (plancha encimera, horno eléctrico y campana extractora) y conexión para gas natural (Calidda). El edificio cuenta con dos pisos de base comercial que permitirá ofrecer servicios diversos como restaurantes, tiendas de conveniencia, etc.',
    habitaciones: 3,
    banos: 3,
    ciudad: 'Lima',
    direccion: 'Ur. Leuro, Miraflores, Lima, Lima',
    tipo: 'Departamento',
    area: 137,
    precio: 290000,
    imagenes: [
      '/vivienda_simulator/images/viviendas/vivienda16/vivienda16_1.jpg',
      '/vivienda_simulator/images/viviendas/vivienda16/vivienda16_2.jpeg',
      '/vivienda_simulator/images/viviendas/vivienda16/vivienda16_3.jpg',
      '/vivienda_simulator/images/viviendas/vivienda16/vivienda16_4.jpg',
      '/vivienda_simulator/images/viviendas/vivienda16/vivienda16_5.jpg',
      '/vivienda_simulator/images/viviendas/vivienda16/vivienda16_6.jpg',
      '/vivienda_simulator/images/viviendas/vivienda16/vivienda16_7.jpg',
      '/vivienda_simulator/images/viviendas/vivienda16/vivienda16_8.jpeg'
    ]
  },
  17: {
    nombre: 'AMME',
    descripcion: 'Adéntrate en un nuevo universo de conexiones, recreación, comunidad y plenitud. Conoce el nuevo proyecto de San Isidro que renovará tu vida urbana. Gracias a su ubicación sobre Calle Amador Merino Reyna, el proyecto se rodea de un sinfín de puntos esenciales para ofrecerte accesibilidad rápida y exclusiva en la zona Depas de 1 y 2 dormitorios exclusivos. Áreas comunes: Áreas verdes, Gimnasio, Lobby, Parque privado y Sala de usos múltiples. ',
    habitaciones: 2,
    banos: 2,
    ciudad: 'Lima',
    direccion: 'Jardín, Provincia de Lima, Provincia de Lima',
    tipo: 'Departamento',
    area: 61,
    precio: 168500,
    imagenes: [
      '/vivienda_simulator/images/viviendas/vivienda17/vivienda17_1.jpg',
      '/vivienda_simulator/images/viviendas/vivienda17/vivienda17_2.jpg',
      '/vivienda_simulator/images/viviendas/vivienda17/vivienda17_3.jpg',
      '/vivienda_simulator/images/viviendas/vivienda17/vivienda17_4.jpg',
      '/vivienda_simulator/images/viviendas/vivienda17/vivienda17_5.jpg',
      '/vivienda_simulator/images/viviendas/vivienda17/vivienda17_6.jpg',
      '/vivienda_simulator/images/viviendas/vivienda17/vivienda17_7.jpg',
      '/vivienda_simulator/images/viviendas/vivienda17/vivienda17_8.jpg',
      '/vivienda_simulator/images/viviendas/vivienda17/vivienda17_9.jpg',
      '/vivienda_simulator/images/viviendas/vivienda17/vivienda17_10.jpg'
    ]
  },
  18: {
    nombre: 'GALICIA',
    descripcion: 'Disfruta tu nuevo departamento en una zona muy segura en Santiago de Surco, conectada con todo lo que te gusta: mucha naturaleza, centros comerciales, cines, bancos, lugares de entretenimiento, ciclovías, avenidas principales y mucho más. Departamentos funcionales con elegantes acabados (Cuarzo en tableros de cocina y muebles altos con poliuretano), cuatro puntos de gas natural. Además, contamos con 17 Estacionamientos para bicicletas y certificación EDGE (menor consumo en agua y electricidad).',
    habitaciones: 2,
    banos: 3,
    ciudad: 'Lima',
    direccion: 'Ur. Residencial Higuereta, Santiago de Surco, Lima, Lima',
    tipo: 'Departamento',
    area: 176,
    precio: 235284,
    imagenes: [
      '/vivienda_simulator/images/viviendas/vivienda18/vivienda18_1.jpg',
      '/vivienda_simulator/images/viviendas/vivienda18/vivienda18_2.jpg',
      '/vivienda_simulator/images/viviendas/vivienda18/vivienda18_3.jpg',
      '/vivienda_simulator/images/viviendas/vivienda18/vivienda18_4.jpg'
    ]
  }
};

// Obtener el valor del parámetro vivienda_id de la URL
const viviendaId = urlParams.get('vivienda_id');
window.addEventListener('load', () => {
  generarSugerencias();
 });
 
// Obtener información sobre la vivienda seleccionada
const vivienda = viviendas[viviendaId]; 

// Actualizar el contenido del div con la clase project
document.querySelector('.project .header h2').textContent = vivienda.nombre;
document.querySelector('.project .description p').textContent = vivienda.descripcion;
document.getElementById('num-habitaciones').innerHTML = `<span class="icon-1"></span>N.º Habitaciones: ${vivienda.habitaciones}`;
document.getElementById('num-banos').innerHTML = `<span class="icon-2"></span>N.º Baños: ${vivienda.banos}`;
document.getElementById('ciudad').innerHTML = `<span class="icon-1"></span>${vivienda.ciudad}`;
document.getElementById('direccion').innerHTML = `<span class="icon-2"></span>${vivienda.direccion}`;
document.getElementById('tipo_t').innerHTML = `<span class="icon"></span>${vivienda.tipo}`;
document.getElementById('area_total').innerHTML = `<span class="icon"></span>${vivienda.area} m²`;
const precioFormateado = vivienda.precio.toLocaleString('es-PE', {minimumFractionDigits: 0});
document.getElementById('price_t').innerHTML = `<span class="icon"></span>${precioFormateado} soles`;
  
// Obtener el div con la clase slide
const slideDiv = document.querySelector('.slide');

// Eliminar todos los div con la clase st
const stDivs = document.querySelectorAll('.st');
stDivs.forEach(stDiv => stDiv.remove());

// Eliminar todos los input type radio y sus etiquetas

const radioInputs = document.querySelectorAll('input[type="radio"]');
radioInputs.forEach(radioInput => radioInput.remove());
const radioLabels = document.querySelectorAll('.m-btn');
radioLabels.forEach(radioLabel => radioLabel.remove());
// Eliminar todos los div con las clases a-b1 hasta a-b12
for (let i = 1; i <= 12; i++) {
    const div = document.querySelector(`.a-b${i}`);
    if (div) {
        div.remove();
    }
}

// Agregar nuevos input type radio y sus etiquetas
const navMDiv = document.querySelector('.nav-m');
vivienda.imagenes.forEach((imagen, index) => {
    const radioInput = document.createElement('input');
    radioInput.type = 'radio';
    radioInput.name = 'radio-btn';
    radioInput.id = `radio${index + 1}`;
    if (index === 0) {
        radioInput.checked = true;
    }
    slideDiv.insertBefore(radioInput, slideDiv.firstChild);

    const radioLabel = document.createElement('label');
    radioLabel.htmlFor = `radio${index + 1}`;
    radioLabel.classList.add('m-btn');
    navMDiv.appendChild(radioLabel);
});

// Agregar nuevos div con las clases a-b1 hasta a-bN (donde N es el número de imágenes)
const navAutoDiv = document.querySelector('.nav-auto');
vivienda.imagenes.forEach((imagen, index) => {
    const div = document.createElement('div');
    div.classList.add(`a-b${index + 1}`);
    navAutoDiv.appendChild(div);
});

// Agregar nuevos div con la clase st y agregar imágenes desde el objeto viviendas
vivienda.imagenes.forEach((imagen, index) => {
      const stDiv = document.createElement('div');
      stDiv.classList.add('st');
      if (index === 0) {
          stDiv.classList.add('first');
      }
      const img = document.createElement('img');
      img.src = imagen;
      stDiv.appendChild(img);
      slideDiv.appendChild(stDiv);
  });

// Generar dinámicamente reglas CSS para cambiar el margen izquierdo del div con la clase first
const style = document.createElement('style');
let css = '';
vivienda.imagenes.forEach((imagen, index) => {
    css += `#radio${index + 1}:checked ~ .first { margin-left: -${800 * index}px; }\n`;
});
style.textContent = css;
document.head.appendChild(style);

// Actualizar el código para el contador para que funcione con un número variable de imágenes
let counter = 2;

const numImages = vivienda.imagenes.length;
setInterval(function () {
    document.getElementById('radio' + counter).checked = true;
    counter++;
    if (counter > numImages) {
        counter = 1;
    }
}, 3500);

function generarSugerencias() {
  const idActual = urlParams.get('vivienda_id');
  const idsDisponibles = Object.keys(viviendas)
  .filter(id => id !== idActual && id <= 18);
  const idsSeleccionados = [];
  for (let i = 0; i < 6; i++) {
  const indiceAleatorio = Math.floor(Math.random() * idsDisponibles.length);
  const idSeleccionado = idsDisponibles.splice(indiceAleatorio, 1)[0];
  idsSeleccionados.push(idSeleccionado);
  }
  const viviendasSugeridas = idsSeleccionados.map(id => viviendas[id]);
  
  let html = '';
  viviendasSugeridas.forEach((vivienda, index) => {
  html += `
  <div class="investment" data-id="${idsSeleccionados[index]}">
  <img src="${vivienda.imagenes[0]}">
  <div class="investment-info">
  <h4>${vivienda.nombre}</h4>
  <p>${vivienda.descripcion.slice(0, 50)}...</p>
  <div class="amount">
  <h4>S/.${vivienda.precio}</h4>
  </div>
  </div>
  </div>
  `;
  });
  const investmentsDiv = document.querySelector('.investments');
  investmentsDiv.innerHTML = investmentsDiv.querySelector('.header').outerHTML + html;
  
  document.querySelectorAll('.investment[data-id]').forEach(vivienda => {
  vivienda.addEventListener('click', () => {
  const id = vivienda.dataset.id;
  window.location.href = `/vivienda_simulator/vivienda_simulator.html?vivienda_id=${id}&userId=${userId}`;
  });
  }); 
 }
 
 const buttonCotizar = document.querySelector('#cotizar_top');

 buttonCotizar.addEventListener('click', () => {
  // Obtener los parámetros de la URL
  const urlParams = new URLSearchParams(window.location.search);

  // Obtener el ID de la vivienda seleccionada a partir de los parámetros de la URL
  const viviendaId = urlParams.get('vivienda_id');

  // Obtener el precio de la vivienda seleccionada
  const precioVivienda = viviendas[viviendaId].precio;

  // Crear una copia del contenido HTML de la sección "second_operation"
  let secondOperationContent = document.querySelector('.second_operation').innerHTML;

  // Reemplazar los valores de los campos "Valor de vivienda" y "Cuota inicial" en la copia del contenido
  secondOperationContent = secondOperationContent.replace(
    'id="home-value" name="home-value">',
    `id="home-value" name="home-value" value="${precioVivienda}">`
  );

  Swal.fire({
    title: 'Simulador',
    html: secondOperationContent,
    showCancelButton: true,
    confirmButtonText: 'Simular'
  }).then((result) => {
    if (result.isConfirmed) {
      // Convertir los valores de porcentaje a decimales
      const seguroDesgravamenMensual = parseFloat(Swal.getPopup().querySelector('#monthly-debt-insurance').value) / 100;
      const seguroRiesgoMensual = parseFloat(Swal.getPopup().querySelector('#mensual-riesgo').value) / 100;
      const valorTasa = parseFloat(Swal.getPopup().querySelector('#value-tasa').value) / 100;
  
      // Obtener los valores de los campos del formulario
      const numeroAnios = parseInt(Swal.getPopup().querySelector('#numero-anios').value);
      const frecuenciaPagoDias = parseInt(Swal.getPopup().querySelector('#frecuencia-pago-dias').value);
  
      // Calcular el número de cuotas por año y el total de períodos
      const numeroCuotasPorAnio = 360 / frecuenciaPagoDias;
      const totalPeriodos = numeroCuotasPorAnio * numeroAnios;
  
      // Calcular la tasa efectiva mensual (TEM)
      let tem;
      if (Swal.getPopup().querySelector('#type-tasa').value === 'tna') {
        tem = Math.pow(1 + valorTasa / 360, 30) - 1;
      } else {
        tem = Math.pow(1 + valorTasa, 1 / 12) - 1;
      }
  
      // Inicializar variables para el cálculo de la tabla
      let saldoInicial = parseFloat(Swal.getPopup().querySelector('#financing-amount').value);
      let periodo = 1;
  
      // Obtener una referencia al cuerpo de la tabla
      const tableBody = document.querySelector('.schedule.first_operation tbody');
  
      // Obtener los valores de plazo de gracia total y parcial
      const plazoGraciaTotal = parseInt(Swal.getPopup().querySelector('#total-plazo-gracia-total').value);
      const plazoGraciaParcial = parseInt(Swal.getPopup().querySelector('#total-plazo-gracia-parcial').value);
  
      // Iterar sobre cada período para calcular los valores de la tabla y agregar nuevas filas
      while (periodo <= totalPeriodos) {
        // Calcular los valores para el período actual
        const interes = -(tem * saldoInicial);
        let cuota =
          -(saldoInicial * (tem + seguroDesgravamenMensual)) /
          (1 - Math.pow(1 + tem + seguroDesgravamenMensual, -(totalPeriodos - periodo + 1)));
        const seguroDesgravamen = -(saldoInicial * seguroDesgravamenMensual);
        let amortizacion = cuota - interes - seguroDesgravamen;
        const seguroRiesgo = precioVivienda * seguroRiesgoMensual;
        let saldoFinal = saldoInicial + amortizacion;
        let flujo = -(Math.abs(cuota) + Math.abs(seguroRiesgo));

        // Determinar el valor del plazo de gracia para el período actual
        let plazoGracia;
        if (periodo <= plazoGraciaTotal) {
          plazoGracia = 'T';
          amortizacion = 0;
          cuota = 0;
          saldoFinal = (saldoInicial + amortizacion) - interes;
          flujo = -(Math.abs(cuota) + Math.abs(seguroDesgravamen) + Math.abs(seguroRiesgo));
        } else if (periodo <= plazoGraciaTotal + plazoGraciaParcial) {
          plazoGracia = 'P';
          amortizacion = 0;
          cuota = interes;
          saldoFinal = saldoInicial + amortizacion;
          flujo = -(Math.abs(cuota) + Math.abs(seguroDesgravamen) + Math.abs(seguroRiesgo));
        } else {
          plazoGracia = 'S';
        }

        // Crear una nueva fila y celdas para el período actual
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
          <td>${periodo}</td>
          <td>${(tem * 100).toFixed(2)}%</td>
          <td>${plazoGracia}</td>
          <td>${saldoInicial.toFixed(2)}</td>
          <td>${interes.toFixed(2)}</td>
          <td>${cuota.toFixed(2)}</td>
          <td>${amortizacion.toFixed(2)}</td>
          <td>${seguroDesgravamen.toFixed(2)}</td>
          <td>${seguroRiesgo.toFixed(2)}</td>
          <td>${saldoFinal.toFixed(2)}</td>
          <td>${flujo.toFixed(2)}</td>
        `;
  
        // Agregar la nueva fila a la tabla
        tableBody.appendChild(newRow);
  
        // Actualizar el saldo inicial para el siguiente período
        saldoInicial = saldoFinal;
  
        // Incrementar el contador de períodos
        periodo++;
      }

      const cok = parseFloat(Swal.getPopup().querySelector('#tasa-costo-efectiva').value) / 100;

      let van = 0;
      
      for (let i = 0; i < tableBody.rows.length; i++) {
        const periodo = parseInt(tableBody.rows[i].cells[0].textContent);
        const flujo = parseFloat(tableBody.rows[i].cells[10].textContent);
      
        van += flujo / Math.pow(1 + cok, periodo);
      }
      
      let tir = 0;
      let vanSum = -Infinity;
      const financingAmount = parseFloat(Swal.getPopup().querySelector('#financing-amount').value);
      let iterations = 0;
      
      while (Math.abs(vanSum - financingAmount) > 0.01 && iterations < 1000) {
        vanSum = 0;
      
        for (let i = 0; i < tableBody.rows.length; i++) {
          const periodo = parseInt(tableBody.rows[i].cells[0].textContent);
          const flujo = parseFloat(tableBody.rows[i].cells[10].textContent);
      
          vanSum += flujo / Math.pow(1 + tir, periodo);
        }
      
        if (vanSum < financingAmount) {
          tir += 0.0001;
        } else {
          tir -= 0.0001;
        }
      
        iterations++;
      }      
      
      // Agregar el VAN y la TIR a la tabla
      const vanTirTableBody = document.querySelector('#van-tir tbody');
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td>${van.toFixed(2)}</td>
        <td>${tir.toFixed(4)}</td>
      `;
      vanTirTableBody.appendChild(newRow);      
    }
  });
  

  // Función para calcular y actualizar el resultado del bono
  const updateBonoResult = () => {
    // Obtener los valores de los cuadros combinados "Bono de buen pagador" y "Bono de vivienda sostenible"
    const bpValue = Swal.getPopup().querySelector('#good-payer-bonus').value;
    const veValue = Swal.getPopup().querySelector('#sustainable-housing-bonus').value;

    // Calcular el resultado del bono en función del valor de la vivienda y las opciones seleccionadas en los cuadros combinados
    let bonoResult;
    if (precioVivienda >= 65200 && precioVivienda <= 93100) {
      if (bpValue === 'si' && veValue === 'si') {
        bonoResult = 0;
      } else if (bpValue === 'si' && veValue === 'no') {
        bonoResult = 0;
      } else if (bpValue === 'no' && veValue === 'si') {
        bonoResult = 31100;
      } else if (bpValue === 'no' && veValue === 'no') {
        bonoResult = 25700;
      }
    } else if (precioVivienda > 93100 && precioVivienda <= 139400) {
      if (bpValue === 'si' && veValue === 'si') {
        bonoResult = 0;
      } else if (bpValue === 'si' && veValue === 'no') {
        bonoResult = 0;
      } else if (bpValue === 'no' && veValue === 'si') {
        bonoResult =        bonoResult = 26800;
      } else if (bpValue === 'no' && veValue === 'no') {
        bonoResult = 21400;
      }
    } else if (precioVivienda > 139400 && precioVivienda <= 232200) {
      if (bpValue === 'si' && veValue === 'si') {
        bonoResult = 0;
      } else if (bpValue === 'si' && veValue === 'no') {
        bonoResult = 0;
      } else if (bpValue === 'no' && veValue === 'si') {
        bonoResult = 25000;
      } else if (bpValue === 'no' && veValue === 'no') {
        bonoResult = 19600;
      }
    } else if (precioVivienda > 232200 && precioVivienda <= 343900) {
      if (bpValue === 'si' && veValue === 'si') {
        bonoResult = 0;
      } else if (bpValue === 'si' && veValue === 'no') {
        bonoResult = 0;
      } else if (bpValue === 'no' && veValue === 'si') {
        bonoResult = 16200;
      } else if (bpValue === 'no' && veValue === 'no') {
        bonoResult = 10800;
      }
    }

    // Actualizar el valor del campo "Bono"
    Swal.getPopup().querySelector('#bono-bp').value = bonoResult;
    const cuotaInicialPorcentaje = Swal.getPopup().querySelector('#initial-fee').value;
    const cuotaInicial = (cuotaInicialPorcentaje / 100) * precioVivienda;
    // Calcular el monto a financiar
    let monto_financiar = precioVivienda - (cuotaInicial + bonoResult);

    // Validar que el monto a financiar no sea negativo
    if (monto_financiar < 0) {
      monto_financiar = 0;
    }

    // Formatear el valor del monto a financiar para mostrar solo dos decimales
    monto_financiar = monto_financiar.toFixed(2);

    // Actualizar el valor del campo "Monto a financiar"
    Swal.getPopup().querySelector('#financing-amount').value = monto_financiar;
  };

  // Agregar controladores de eventos para los eventos "change" de los cuadros combinados
  Swal.getPopup().querySelector('#good-payer-bonus').addEventListener('change', updateBonoResult);
  Swal.getPopup().querySelector('#sustainable-housing-bonus').addEventListener('change', updateBonoResult);
  Swal.getPopup().querySelector('#initial-fee').addEventListener('change', updateBonoResult);

  // Calcular y actualizar el resultado del bono inicialmente
  updateBonoResult();
});




 