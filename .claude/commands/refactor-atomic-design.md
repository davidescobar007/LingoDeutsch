# Refactorización a Atomic Design

## Contexto

Necesito refactorizar el feature **[NOMBRE_DEL_FEATURE]** para que siga 100% los principios de atomic design. Actualmente viola la jerarquía correcta.

## Arquitectura Objetivo

```
Page (solo data fetching)
└── Template[NombreFeature] (transformación + layout)
    ├── Organism[Seccion1]
    ├── Organism[Seccion2]
    │   └── Molecule[Componente]
    └── Organism[Seccion3]
```

## Reglas Críticas

### 1. Separación de Responsabilidades

-  **Page**: SOLO hooks de data fetching. Cero transformaciones, cero UI
-  **Template**: Transformaciones de datos + layout responsivo + composición de organismos
-  **Organisms**: Secciones auto-contenidas con lógica de presentación
-  **Molecules**: Extraer patrones repetidos (2+ átomos combinados)
-  **Atoms**: Usar los existentes de `@/components/atoms`

### 2. Manejo de Transformaciones

-  ❌ NO crear nuevos hooks solo para transformar data
-  ❌ NO crear actions para transformaciones simples de presentación
-  ✅ Templates manejan transformaciones relacionadas con UI/presentación
-  ✅ Si es lógica de negocio compleja, entonces sí usar actions

### 3. Convenciones Obligatorias

```tsx
// Naming
export const MoleculeNombre = () => {}
export const OrganismNombre = () => {}
export const TemplateNombre = () => {}

// Props
- Alfabéticamente ordenados
- extraClassName solo para spacing (margin/padding)
- Tipos opcionales con ? (no default props obligatorios)

// Imports
- import { Link } from '@/navigation' (NO next/link)
- Ordenados automáticamente con lint:fix
```

### 4. Estructura de Directorios

```
src/components/
├── molecules/
│   └── [nombreMolecule]/
│       └── nombreMolecule.tsx
├── organisms/
│   └── [NombreOrganism]/
│       └── nombreOrganism.tsx
└── templates/
    └── [NombreTemplate]/
        └── nombreTemplate.tsx
```

### 5. Index Exports (alfabético)

```tsx
// molecules/index.ts
export { MoleculeNombre } from './nombreMolecule/nombreMolecule'

// organisms/index.ts (sección Feature Components)
export { OrganismNombre } from './NombreOrganism/nombreOrganism'

// templates/index.ts
export { TemplateNombre } from './NombreTemplate/nombreTemplate'
```

## Pasos de Implementación

**Approach bottom-up (moléculas → organismos → template → page):**

1. Identificar patrones repetidos → crear Molecules
2. Extraer secciones lógicas → crear Organisms
3. Crear Template que compone todos los organisms
4. Simplificar Page a solo data fetching
5. Actualizar todos los index.ts
6. Ejecutar `npm run lint:fix && npm run prettier`

## Criterios de Éxito

✅ Page tiene ≤ 35 líneas (solo hooks + template)
✅ Template recibe data RAW (sin transformar desde page)
✅ Cero errores de linting
✅ Props ordenados alfabéticamente
✅ Imports usan `@/navigation` para Links
✅ Jerarquía: Page → Template → Organisms → Molecules → Atoms

## Ejemplo de Template Correcto

```tsx
'use client'
import { Organism1, Organism2 } from '@/components/organisms'
import { TData } from '@/modules/actions/types'

type TemplateFeatureProps = {
   rawData: TData[]
   user?: TUser
}

export const TemplateFeature = ({ rawData, user }: TemplateFeatureProps) => {
   // Transformación de presentación aquí
   const transformedData = rawData?.map(item => ({...})) || []

   return (
      <div className="layout-classes">
         <Organism1 data={transformedData} />
         <Organism2 extraClassName="mt-4" user={user} />
      </div>
   )
}
```

## Ejemplo de Page Correcto

```tsx
'use client'
import { TemplateFeature } from '@/components/templates'
import { useGetData } from '@/hooks/data'
import { getUserInfo } from '@/modules/actions/users.actions'

const FeaturePage = () => {
   const user = getUserInfo()
   const { data } = useGetData()

   return <TemplateFeature rawData={data || []} user={user} />
}

export default FeaturePage
```

---

## Tu Tarea

Refactoriza el feature **[NOMBRE_DEL_FEATURE]** ubicado en `[RUTA_DEL_PAGE]` siguiendo estas reglas. Crea un plan primero, luego implementa paso a paso.
