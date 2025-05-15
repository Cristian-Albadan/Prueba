// Inicializar la animación al scroll
AOS.init();

// Buscador mejorado
document.getElementById('searchInput').addEventListener('input', function () {
  const query = this.value.toLowerCase();
  document.querySelectorAll('.timeline-item').forEach(item => {
    const matches = item.textContent.toLowerCase().includes(query);
    
    // Aplicar animación de fade para una mejor experiencia visual
    if (matches) {
      item.style.display = 'flex';
      item.style.opacity = 1;
    } else {
      item.style.opacity = 0;
      setTimeout(() => {
        item.style.display = 'none';
      }, 300);
    }
  });
  
  // Si no hay resultados, mostrar mensaje
  const visibleItems = [...document.querySelectorAll('.timeline-item')].filter(
    item => item.style.display !== 'none'
  );
  
  // Eliminar mensaje anterior si existe
  const existingMsg = document.getElementById('no-results');
  if (existingMsg) existingMsg.remove();
  
  // Mostrar mensaje si no hay resultados y hay una búsqueda
  if (visibleItems.length === 0 && query !== '') {
    const noResults = document.createElement('div');
    noResults.id = 'no-results';
    noResults.className = 'alert alert-info text-center my-4';
    noResults.innerHTML = '<i class="fas fa-search me-2"></i>No se encontraron resultados para "<strong>' + query + '</strong>"';
    document.querySelector('.timeline-section').appendChild(noResults);
  }
});

// Chart.js
const ctx = document.getElementById('techChart');
new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['1991', '1992', '1994 (D)', '1994 (C)', '2004', '2008'],
    datasets: [{
      label: 'Tecnologías mencionadas',
      data: [4, 3, 2, 4, 2, 4],
      backgroundColor: ['#0d6efd', '#6f42c1', '#20c997', '#ffc107', '#198754', '#dc3545'],
      borderColor: [
        'rgba(13, 110, 253, 1)',
        'rgba(111, 66, 193, 1)',
        'rgba(32, 201, 151, 1)',
        'rgba(255, 193, 7, 1)',
        'rgba(25, 135, 84, 1)',
        'rgba(220, 53, 69, 1)'
      ],
      borderWidth: 2,
      borderRadius: 6,
      hoverBackgroundColor: [
        'rgba(13, 110, 253, 0.8)',
        'rgba(111, 66, 193, 0.8)',
        'rgba(32, 201, 151, 0.8)',
        'rgba(255, 193, 7, 0.8)',
        'rgba(25, 135, 84, 0.8)',
        'rgba(220, 53, 69, 0.8)'
      ]
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Cantidad de tecnologías por año (según entrevistas)',
        font: {
          size: 16,
          weight: 'bold'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14
        },
        bodyFont: {
          size: 13
        },
        callbacks: {
          label: function(context) {
            const etiquetas = {
              0: 'Ensamblador, BASIC, Pascal',
              1: 'Carol, Pascal',
              2: 'Lógica difusa',
              3: 'Clipper, Informix, DataFlex',
              4: 'Java, Programación Genética',
              5: 'PHP, Frameworks web'
            };
            return etiquetas[context.dataIndex];
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          precision: 0
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    },
    animation: {
      duration: 1500,
      easing: 'easeOutQuart'
    }
  }
});
const ctx2 = document.getElementById('dificultadChart');
new Chart(ctx2, {
  type: 'bar',
  data: {
    labels: ['1991 - Luis B. Chicaiza', '2004 - Julián García', '2008 - Yuri Niño'],
    datasets: [{
      label: 'Nivel de dificultad percibido (1=bajo, 5=alto)',
      data: [5, 3, 4],
      backgroundColor: ['#dc3545', '#ffc107', '#0d6efd']
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Dificultades iniciales enfrentadas por entrevistados'
      }
    },
    scales: {
      y: {
        min: 1,
        max: 5,
        ticks: {
          stepSize: 1,
          callback: function(value) {
            return ['Bajo', '', 'Medio', '', 'Alto'][value - 1];
          }
        }
      }
    }
  }
});


// Activar los popovers de Bootstrap
var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl)
});

// Animación para las tarjetas de la línea de tiempo
document.querySelectorAll('.timeline-item').forEach(item => {
  item.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px)';
    this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.15)';
  });
  
  item.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
    this.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.1)';
  });
});

// Navegación suave al hacer clic en los enlaces del menú
document.querySelectorAll('a.nav-link').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: 'smooth'
      });
    }
  });
});

// Resaltar la sección activa en el menú de navegación
window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('section');
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= (sectionTop - 100)) {
      current = section.getAttribute('id');
    }
  });
  
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});
