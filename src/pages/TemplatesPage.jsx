import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee, Store, Palette, Globe, Zap, Brush, Eye, ShoppingCart } from 'lucide-react';

const TemplatesPage = () => {
  const templates = [
    {
      id: 'cafe',
      title: 'Café Artesanal',
      description: 'Template interativo com elementos 3D de café, animações de fumaça e experiência sensorial',
      price: 350,
      icon: Coffee,
      color: 'bg-amber-900/30',
      features: ['Xícara 3D interativa', 'Animações de café', 'Integração WhatsApp'],
      image: '☕'
    },
    {
      id: 'cafePro',
      title: 'Café Profissional',
      description: 'Template interativo com elementos 3D de café, animações de fumaça e experiência sensorial',
      price: 350,
      icon: Coffee,
      color: 'bg-amber-900/35',
      features: ['Xícara 3D interativa', 'Animações de café', 'Integração WhatsApp'],
      image: '☕'
    },
    {
      id: 'cafe-Pro2',
      title: 'Café Mega-Profissional',
      description: 'Template interativo com elementos 3D de café, animações de fumaça e experiência sensorial',
      price: 350,
      icon: Coffee,
      color: 'bg-amber-900/35',
      features: ['Xícara 3D interativa', 'Animações de café', 'Integração WhatsApp'],
      image: '☕'
    },
    {
      id: 'cafePro2',
      title: 'Café Hyper-Profissional',
      description: 'Template interativo com elementos 3D de café, animações de fumaça e experiência sensorial',
      price: 350,
      icon: Coffee,
      color: 'bg-amber-900/35',
      features: ['Xícara 3D interativa', 'Animações de café', 'Integração WhatsApp'],
      image: '☕'
    },
    {
      id: 'store',
      title: 'Loja Elegante',
      description: 'E-commerce visual com produtos em destaque e carrinho interativo',
      price: 350,
      icon: Store,
      color: 'bg-emerald-900/30',
      features: ['Vitrine 3D', 'Carrinho animado', 'Checkout simplificado'],
      image: '🛍️'
    },
    {
      id: 'artist',
      title: 'Estúdio Criativo',
      description: 'Portfólio artístico com galeria 3D e animações de canvas',
      price: 500,
      icon: Palette,
      color: 'bg-purple-900/30',
      features: ['Galeria 3D', 'Canvas animado', 'Projetos interativos'],
      image: '🎨'
    },
    {
      id: 'travel',
      title: 'Agência de Viagens',
      description: 'Experiência imersiva com destinos em parallax e mapas interativos',
      price: 400,
      icon: Globe,
      color: 'bg-sky-900/30',
      features: ['Parallax 3D', 'Mapa interativo', 'Galeria 360°'],
      image: '✈️'
    },
    {
     id: 'viagens',
     title: 'Agência de Viagens',
     description: 'Experiência imersiva com parallax 3D de destinos ao redor do mundo',
     price: 600,
     icon: Globe,
     color: 'bg-gradient-to-br from-sky-900/40 to-emerald-900/30',
     features: ['Parallax 4 camadas', 'Animações 3D', 'Mapas interativos'],
     image: '✈️',
     link: '/template/viagens'
    }
    ,
    {
     id: 'viagensPro',
     title: 'Agência de Viagens PRO',
     description: 'Versão premium com mais efeitos 3D e interatividade avançada',
     price: 1200,
     icon: Globe,
     color: 'bg-gradient-to-br from-blue-900/40 to-purple-900/30',
     features: ['Avião 3D voando', 'Tour virtual 360°', 'Simulador de clima'],
     image: '🌍',
     link: '/template/viagensPro'
    }
    ,
    {
      id: 'fitness',
      title: 'Academia Power',
      description: 'Site energético com animações de movimento e agenda de aulas',
      price: 350,
      icon: Zap,
      color: 'bg-red-900/30',
      features: ['Animação corporal', 'Agenda interativa', 'Progresso 3D'],
      image: '💪'
    },
    {
      id: 'construction',
      title: 'Construtora Moderna',
      description: 'Portfólio de projetos com modelos 3D de construções',
      price: 450,
      icon: Brush,
      color: 'bg-orange-900/30',
      features: ['Modelos 3D', 'Timeline de obras', 'Tour virtual'],
      image: '🏗️'
    },
     {
      id: 'Drink',
      title: 'Bebidas',
      description: 'Portfólio de projetos com modelos 3D de construções',
      price: 450,
      icon: Brush,
      color: 'bg-orange-900/30',
      features: ['Modelos 3D', 'Timeline de obras', 'Tour virtual'],
      image: '🏗️'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Catálogo de Templates
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Escolha o template perfeito para seu negócio. Cada um é único, responsivo e pronto para impressionar.
          </p>
        </div>

        {/* Grid de Templates */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {templates.map((template) => {
            const Icon = template.icon;
            return (
              <div key={template.id} className="glass-effect rounded-2xl overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
                {/* Header */}
                <div className={`p-6 ${template.color}`}>
                  <div className="flex items-center justify-between mb-4">
                    <Icon className="w-10 h-10" />
                    <div className="text-3xl">{template.image}</div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{template.title}</h3>
                  <p className="text-gray-300 text-sm">{template.description}</p>
                </div>

                {/* Features */}
                <div className="p-6">
                  <ul className="space-y-2 mb-6">
                    {template.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-400">
                        <span className="text-green-500 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="text-3xl font-bold">R$ {template.price}</div>
                      <div className="text-sm text-gray-400">+ manutenção mensal</div>
                    </div>
                    <div className="text-sm text-gray-400">Pronto em 7 dias</div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3">
                    <Link 
                      to={`/template/${template.id}`}
                      className="flex-1 btn-secondary flex items-center justify-center"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Ver Demo
                    </Link>
                    <button className="flex-1 btn-primary flex items-center justify-center">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Comprar
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="glass-effect rounded-2xl p-8 text-center mb-20">
          <h2 className="text-3xl font-bold mb-4">Não encontrou o que procura?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Podemos criar um template 100% personalizado para suas necessidades específicas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary px-8 py-4">
              <ShoppingCart className="inline mr-2" />
              Solicitar Template Personalizado
            </button>
            <Link to="/" className="btn-secondary px-8 py-4">
              Voltar para Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplatesPage;