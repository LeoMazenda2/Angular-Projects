export interface Produto {
    nome: string;
    descricao: string;
    imagemUrl?: string;
    preco: string;
    estoque: number;
    id: number;
}

export interface Produtos extends Array<Produto> { }