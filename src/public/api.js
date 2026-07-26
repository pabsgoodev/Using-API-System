"use strict";

const container = document.getElementById("newsContainer") as HTMLDivElement;
const input = document.getElementById("searchInput") as HTMLInputElement;
const searchBtn = document.getElementById("searchBtn") as HTMLButtonElement;

interface News {
    title: string;
    description: string;
    image: string;
    url: string;
    publishedAt: string;
    source: {
        name: string;
    };
}

async function fetchNews(q?: string, category?: string): Promise<void> {
    try {
        container.textContent = "Buscando notícias...";

        const url = new URL("/api/news", window.location.origin);

        if (q) url.searchParams.append("q", q);
        if (category) url.searchParams.append("category", category);

        const res = await fetch(url.toString());

        if (!res.ok) {
            throw new Error("Erro ao buscar notícias");
        }

        const news: News[] = await res.json();

        renderNews(news);

    } catch (error) {
        console.error(error);

        container.textContent = "Erro ao buscar notícias.";
    }
}

function renderNews(news: News[]): void {
    container.replaceChildren();

    if (!news.length) {
        const p = document.createElement("p");
        p.className = "no-results";
        p.textContent = "Nenhuma notícia encontrada.";
        container.appendChild(p);
        return;
    }

    news.forEach((n) => {
        const card = document.createElement("article");
        card.className = "news-card";

        if (n.image) {
            try {
                const imageUrl = new URL(n.image);

                if (
                    imageUrl.protocol === "https:" ||
                    imageUrl.protocol === "http:"
                ) {
                    const imageDiv = document.createElement("div");
                    imageDiv.className = "card-image";

                    const img = document.createElement("img");
                    img.src = imageUrl.toString();
                    img.alt = n.title;
                    img.loading = "lazy";

                    imageDiv.appendChild(img);
                    card.appendChild(imageDiv);
                }
            } catch {
            }
        }

        const content = document.createElement("div");
        content.className = "card-content";

        const source = document.createElement("span");
        source.className = "source-tag";
        source.textContent = n.source?.name ?? "Fonte desconhecida";

        const title = document.createElement("h3");
        title.textContent = n.title;

        const description = document.createElement("p");
        description.textContent = n.description ?? "";
        
        const footer = document.createElement("div");
        footer.className = "card-footer";
        
        try {
            const articleUrl = new URL(n.url);

            if (
                articleUrl.protocol === "https:" ||
                articleUrl.protocol === "http:"
            ) {
                const link = document.createElement("a");
                link.href = articleUrl.toString();
                link.target = "_blank";
                link.rel = "noopener noreferrer";
                link.textContent = "Ler mais";

                footer.appendChild(link);
            }
        } catch {
            
        }

        const date = document.createElement("small");
        date.textContent = new Date(n.publishedAt).toLocaleDateString("pt-BR");

        footer.appendChild(date);

        content.appendChild(source);
        content.appendChild(title);
        content.appendChild(description);
        content.appendChild(footer);

        card.appendChild(content);

        container.appendChild(card);
    });
}

searchBtn.addEventListener("click", () => {
    fetchNews(input.value.trim());
});

(window as any).filterCategory = (category: string) => {
    fetchNews(undefined, category);
};

fetchNews();
