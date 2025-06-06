import React, { useState, useEffect } from 'react'
import { Table } from '@/components/ui'
import THead from '@/components/ui/Table/THead'
import Th from '@/components/ui/Table/Th'
import TBody from '@/components/ui/Table/TBody'
import Td from '@/components/ui/Table/Td'
import { useMateriales } from '@/utils/hooks/useMateriales'
import { Skeleton } from '@/components/ui'
import '../inventarioViewStyles.css'
import formatNumber from '@/utils/hooks/formatNumber'
import DeleteButton from '../../DeleteButton'
import { deleteMaterial } from '@/api/api'
import Swal from 'sweetalert2'
import { Material } from '@/@types/mats'
import MatInfoButton from '../Buttons/MatInfoButton'
import EditMatButton from '../Buttons/EditMatButton'

interface MaterialesListProps {
    searchTerm?: string
    onPedidoSubmit: () => void
}

const MaterialesList: React.FC<MaterialesListProps> = ({
    searchTerm = '',
    onPedidoSubmit,
}) => {
    const { materiales, loading, fetchMateriales } = useMateriales()
    const [selectedCategory, setSelectedCategory] =
        useState<string>('Mostrar Todos')

    const onEditSuccess = () => {
        fetchMateriales()
    }

    useEffect(() => {
        fetchMateriales()
    }, [onPedidoSubmit])

    const handleConfirmDelete = (MatID: string) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Deseas eliminar este material?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                handleDelete(MatID)
            }
        })
    }

    const handleDelete = async (MatID: string) => {
        if (!MatID) return

        try {
            const success = await deleteMaterial(MatID)
            if (success) {
                Swal.fire({
                    title: 'Eliminado',
                    text: 'El material ha sido eliminado correctamente.',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                })
                fetchMateriales()
            }
        } catch (error) {
            console.error('Error al eliminar el material:', error)
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al eliminar el material.',
                icon: 'error',
                confirmButtonColor: '#d33',
            })
        }
    }

    const filteredMateriales = materiales.filter(
        (material) =>
            (selectedCategory === 'Mostrar Todos' ||
                material.Categoria === selectedCategory) &&
            (!searchTerm ||
                material.Codigo.toLowerCase().includes(
                    searchTerm.toLowerCase(),
                ) ||
                material.Descripcion.toLowerCase().includes(
                    searchTerm.toLowerCase(),
                ) ||
                material.Categoria.toLowerCase().includes(
                    searchTerm.toLowerCase(),
                ) ||
                material.Proveedor.toLowerCase().includes(
                    searchTerm.toLowerCase(),
                )),
    )

    if (loading) {
        return (
            <div>
                {Array.from(new Array(10)).map((_, index) => (
                    <Skeleton
                        key={index}
                        width="100%"
                        height={100}
                        style={{ marginBottom: '10px' }}
                    />
                ))}
            </div>
        )
    }

    return (
        <>
            {filteredMateriales.length > 0 ? (
                <div className="inv-container">
                    <Table style={{ tableLayout: 'fixed', width: '100%' }}>
                        <THead>
                            <Th
                                className="pt-1 text-center"
                                style={{ width: '15%' }}
                            >
                                Código
                            </Th>
                            <Th
                                className="pt-1 text-center"
                                style={{ width: '35%' }}
                            >
                                Descripción
                            </Th>
                            <Th
                                className="pt-1 text-center"
                                style={{ width: '15%' }}
                            >
                                Categoría
                            </Th>
                            <Th
                                className="pt-1 text-center"
                                style={{ width: '15%' }}
                            >
                                Proveedor
                            </Th>
                            <Th
                                className="pt-1 text-center"
                                style={{ width: '15%' }}
                            >
                                Stock Actual
                            </Th>
                            <Th style={{ width: '10%' }}></Th>
                        </THead>
                    </Table>

                    <div className="inv-body-container">
                        <Table style={{ tableLayout: 'fixed', width: '100%' }}>
                            <TBody>
                                {filteredMateriales.map((material, index) => (
                                    <React.Fragment key={index}>
                                        <tr>
                                            <Td
                                                className="text-center no-wrap td-px"
                                                style={{ width: '15%' }}
                                            >
                                                {material.Codigo}
                                            </Td>
                                            <Td
                                                className="td-px truncate"
                                                style={{ width: '35%' }}
                                            >
                                                {material.Descripcion}
                                            </Td>
                                            <Td
                                                className="text-center no-wrap td-px truncate"
                                                style={{ width: '15%' }}
                                            >
                                                {material.Categoria}
                                            </Td>
                                            <Td
                                                className="text-center no-wrap td-px truncate"
                                                style={{ width: '15%' }}
                                            >
                                                {material.Proveedor}
                                            </Td>
                                            <Td
                                                className="text-center no-wrap td-px"
                                                style={{ width: '15%' }}
                                            >
                                                {material.Stock !== 0
                                                    ? `${formatNumber(material.Stock)} ${material.Unidad}`
                                                    : material.Stock}
                                            </Td>
                                            <Td
                                                className="m-0 text-center no-wrap td-px"
                                                style={{ width: '10%' }}
                                            >
                                                <DeleteButton
                                                    size="small"
                                                    onDelete={() =>
                                                        handleConfirmDelete(
                                                            material._id,
                                                        )
                                                    }
                                                />
                                                <EditMatButton
                                                    size="small"
                                                    material={material}
                                                    onEditSuccess={
                                                        onEditSuccess
                                                    }
                                                />
                                                <MatInfoButton
                                                    size="small"
                                                    material={material}
                                                />
                                            </Td>
                                        </tr>
                                    </React.Fragment>
                                ))}
                            </TBody>
                        </Table>
                    </div>
                </div>
            ) : (
                <p>No hay materiales disponibles.</p>
            )}
        </>
    )
}

export default MaterialesList
