type TreeNode = {
  name: string
  type: string
  category: 'image' | 'archive' | 'folder' | 'file'
  path: string
  children?: TreeNode[]
}

type ImageSource = 'external' | 'internal'

type ArchiveImageMap = Record<
  string,
  {
    fileName: string
    images: { path: string; source: ImageSource }[]
  }
>

const convertToSafeName = (name: string) => {
  return name
    .replace(/\.[^.]+$/, '')
    .replace(/[^a-z0-9-_]+/gi, '-')
    .toLowerCase()
}

export function generateImagesMap(root: TreeNode): ArchiveImageMap {
  const result: ArchiveImageMap = {}

  function traverse(node: TreeNode, parent?: TreeNode) {
    if (node.category === 'archive') {
      const baseName = convertToSafeName(node.name)

      const images: { path: string; source: ImageSource }[] = []

      // Изображения внутри архива
      if (node.children) {
        for (const child of node.children) {
          if (child.category === 'image') {
            images.push({
              path: child.path,
              source: 'internal'
            })
          }
        }
      }

      // Изображения в родительской папке
      if (parent?.children) {
        for (const sibling of parent.children) {
          if (sibling.category === 'image' && convertToSafeName(sibling.name).includes(baseName)) {
            images.push({
              path: sibling.path,
              source: 'external'
            })
          }
        }
      }

      if (images.length > 0) {
        result[baseName] = {
          fileName: node.name,
          images
        }
      }
    }

    if (node.children) {
      for (const child of node.children) {
        traverse(child, node)
      }
    }
  }

  traverse(root)

  return result
}
