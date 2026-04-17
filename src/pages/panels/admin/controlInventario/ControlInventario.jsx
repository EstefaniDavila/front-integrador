import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Filter } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import GeneralInventoryTable from '@/composables/inventory/tables/GeneralInventoryTable';
import CreateProductModal from '@/composables/inventory/modals/CreateProductModal';
import DeleteProductModal from '@/composables/inventory/modals/DeleteProductModal';
import UpdateProductModal from '@/composables/inventory/modals/UpdateProductModal';
import HistoryProductModal from '@/composables/inventory/modals/HistoryProductModal';



const InventoryPage = () => {

  const fakeInventory = {
    rows: [
      { id: "1R-0750", desc: "Filtro aceite", stock: 47, loc: "Estante A", status: "OK", type: "repuesto" },
      { id: "153-5710", desc: "Batería 12V", stock: 8, loc: "Estante B", status: "Bajo", type: "repuesto" },
      { id: "CAT-C15", desc: "Retroexcavadora JCB 3CX", stock: 2, loc: "Zona 1", status: "OK", type: "maquinaria" },
      { id: "9X-2012", desc: "Kit junta motor", stock: 0, loc: "Estante C", status: "AGOT", type: "repuesto" },
      { id: "7E-7777", desc: "Volquete Volvo FMX", stock: 15, loc: "Estante A", status: "OK", type: "maquinaria" },
    ],
    rowCount: 47
  };

  const [products, setProducts] = useState(fakeInventory.rows);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });

  const [search, setSearch] = useState("");
  const [searchFields, setSearchFields] = useState(["id", "desc"]);

  const [filterStatus, setFilterStatus] = useState("todos");
  const [filterType, setFilterType] = useState("todos");

  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const refetchData = () => {
    console.log("Refetching data...");
  };


  // Función para agregar nuevo producto
  const handleCreateProduct = (newProduct) => {
    setProducts(prevProducts => [newProduct, ...prevProducts]);
    console.log("Producto creado:", newProduct);
  };

  // Función para editar producto
  const handleEditProduct = (updatedProduct) => {
    setProducts(prevProducts =>
      prevProducts.map(p =>
        p.id === updatedProduct.id ? updatedProduct : p
      )
    );
    console.log("Producto actualizado:", updatedProduct);
  };

  // Función para eliminar producto
  const handleDeleteProduct = (productToDelete) => {
    setProducts(prevProducts => prevProducts.filter(p => p.id !== productToDelete.id));
    console.log("Producto eliminado:", productToDelete);
  };

  const handleOpenHistory = (product) => {
    setSelectedProduct(product);
    setIsHistoryModalOpen(true);
  };

  const handleCloseHistoryModal = () => {
    setIsHistoryModalOpen(false);
    setSelectedProduct(null);
  };

  const filteredData = products.filter(item => {
    const matchStatus =
      filterStatus === "todos" || item.status.toLowerCase() === filterStatus.toLowerCase();

    const matchType =
      filterType === "todos" || item.type === filterType;

    return matchStatus && matchType;
  });

  const totalPages = Math.ceil(filteredData.length / pagination.pageSize);

  return (
    <div className="p-6 w-full min-h-screen bg-background">
      <div className="max-w-[1600px] mx-auto">

        <div className="flex flex-col gap-6">

          {/* Cabecera */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">
              INVENTARIO DE REPUESTOS Y MAQUINARIA
            </h1>

            <div className="flex gap-2">

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white flex gap-2">
                    <Filter className="h-4 w-4" />
                    Estado: {filterStatus}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setFilterStatus("todos")}>
                    Todos
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("OK")}>
                    OK
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("Bajo")}>
                    Bajo
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("AGOT")}>
                    Agotado
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white flex gap-2">
                    <Filter className="h-4 w-4" />
                    Tipo: {filterType}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setFilterType("todos")}>
                    Todos
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterType("maquinaria")}>
                    Maquinaria
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterType("repuesto")}>
                    Repuestos
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <CreateProductModal onCreate={handleCreateProduct} />


            </div>
          </div>

          <div className="w-full bg-card rounded-xl border shadow-sm p-4">
            <GeneralInventoryTable
              data={filteredData}
              fetchData={refetchData}
              pagination={pagination}
              setPagination={setPagination}
              totalPages={totalPages}
              search={search}
              setSearch={setSearch}
              searchFields={searchFields}
              setSearchFields={setSearchFields}
              onEditProduct={handleEditProduct}
              onDeleteProduct={handleDeleteProduct}
              onOpenHistory={handleOpenHistory}
            />
          </div>

        </div>
      </div>

      <HistoryProductModal
        isOpen={isHistoryModalOpen}
        handleClose={() => {
          setIsHistoryModalOpen(false);
          setSelectedProduct(null);
        }}
        product={selectedProduct}
      />
    </div>
  );
};

export default InventoryPage;