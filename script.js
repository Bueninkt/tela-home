const API_BASE = 'https://back-spider.vercel.app/publicacoes';

async function carregarPublicacoes() {
  const container = document.getElementById('publicacoesContainer');
  container.innerHTML = '';

  try {
    const response = await fetch(`${API_BASE}/listarPublicacoes`);
    const publicacoes = await response.json();

    publicacoes.forEach(pub => {
      const card = document.createElement('div');
      card.className = 'card';
      card.dataset.id = pub.id;

      card.innerHTML = `
        <strong>${pub.nomeAutor || 'Sem nome'}</strong>
        <p>${pub.descricao || 'Publicação'}</p>
        <img src="${pub.imagem || 'https://via.placeholder.com/400'}" alt="Imagem da publicação"/>
        <div class="info">
          <span class="like">❤️ ${pub.likes || 0}</span>
          <span class="delete">🗑️</span>
        </div>
      `;

      // Evento de like
      const likeBtn = card.querySelector('.like');
      likeBtn.addEventListener('click', async () => {
        const likeRes = await fetch(`${API_BASE}/likePublicacao/${pub.id}`, { method: 'POST' });
        if (likeRes.ok) {
          const newLikes = pub.likes + 1;
          pub.likes = newLikes;
          likeBtn.innerHTML = `❤️ ${newLikes}`;
        }
      });

      // Evento de deletar
      const deleteBtn = card.querySelector('.delete');
      deleteBtn.addEventListener('click', async () => {
        const confirmar = confirm('Tem certeza que deseja deletar esta publicação?');
        if (confirmar) {
          const delRes = await fetch(`${API_BASE}/deletarPublicacao/${pub.id}`, { method: 'DELETE' });
          if (delRes.ok) {
            card.remove(); // Remove só este card da tela
          } else {
            alert('Erro ao deletar publicação.');
          }
        }
      });

      container.appendChild(card);
    });

  } catch (error) {
    console.error('Erro ao carregar publicações:', error);
  }
}

document.addEventListener('DOMContentLoaded', carregarPublicacoes);
