import { randomUUID } from "crypto";
import { Replace } from "src/utils/replace";

export interface OrganizationProps {
    name: string;
    razaoSocial: string | null;
    nomeFantasia: string | null;
    cnpj: string | null;
    inscricaoEstadual: string | null;
    phone: string | null;

    createdAt: Date;
    updatedAt: Date;
}

export class Organization {
    private props: OrganizationProps;
    private _id: string;

    constructor(props: Replace<OrganizationProps, { createdAt?: Date, updatedAt?: Date | null }>, id?: string) {
        this.props = {
            ...props,
            createdAt: props.createdAt || new Date(),
            updatedAt: props.updatedAt || new Date(),
        };
        this._id = id || randomUUID();
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this.props.name;
    }

    set name(name: string) {
        this.props.name = name;
    }
    
    get createdAt(): Date {
        return this.props.createdAt;
    }

    set createdAt(createdAt: Date) {
        this.props.createdAt = createdAt;
    }

    get updatedAt(): Date {
        return this.props.updatedAt;
    }

    get razaoSocial(): string | null {
        return this.props.razaoSocial;
    }

    set razaoSocial(razaoSocial: string) {
        this.props.razaoSocial = razaoSocial;
    }

    get nomeFantasia(): string | null {
        return this.props.nomeFantasia;
    }

    set nomeFantasia(nomeFantasia: string) {
        this.props.nomeFantasia = nomeFantasia;
    }

    get cnpj(): string | null {
        return this.props.cnpj;
    }

    set cnpj(cnpj: string) {
        this.props.cnpj = cnpj;
    }

    get inscricaoEstadual(): string | null {
        return this.props.inscricaoEstadual;
    }

    set inscricaoEstadual(inscricaoEstadual: string) {
        this.props.inscricaoEstadual = inscricaoEstadual;
    }

    get phone(): string | null{
        return this.props.phone;
    }

    set phone(phone: string) {
        this.props.phone = phone;
    }
}