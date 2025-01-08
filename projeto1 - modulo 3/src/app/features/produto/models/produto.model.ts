export interface Produto {
    id: number;
    nome: string;
    descricao: string;
    imagemUrl?: string;
    preco: string;
    estoque: number;
}

export interface Produtos extends Array<Produto> { }