import React from 'react';

const EditableContent = ({ section, content, onChange }) => {
  // Helper to render the appropriate input based on field type
  const renderField = (fieldKey, value, path = []) => {
    const currentPath = [...path, fieldKey];
    
    // Handle null values
    if (value === null) {
      return (
        <input
          type="text"
          value=""
          onChange={(e) => onChange(currentPath, e.target.value)}
          className="w-full px-3 py-2 bg-black/40 border border-emerald-500/20 rounded-md text-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
          placeholder="Enter value..."
        />
      );
    }
    
    // Render based on data type
    switch (typeof value) {
      case 'string':
        // For long text, use textarea
        if (value.length > 100) {
          return (
            <textarea
              value={value}
              onChange={(e) => onChange(currentPath, e.target.value)}
              rows={5}
              className="w-full px-3 py-2 bg-black/40 border border-emerald-500/20 rounded-md text-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
            />
          );
        }
        // For short text, use input
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(currentPath, e.target.value)}
            className="w-full px-3 py-2 bg-black/40 border border-emerald-500/20 rounded-md text-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
          />
        );
      
      case 'number':
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(currentPath, Number(e.target.value))}
            className="w-full px-3 py-2 bg-black/40 border border-emerald-500/20 rounded-md text-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
          />
        );
      
      case 'boolean':
        return (
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => onChange(currentPath, e.target.checked)}
              className="w-5 h-5 text-emerald-500 rounded"
            />
            <span className="ml-2 text-white text-sm">{value ? 'Enabled' : 'Disabled'}</span>
          </div>
        );
      
      case 'object':
        // Handle arrays
        if (Array.isArray(value)) {
          return (
            <div className="space-y-4">
              {value.map((item, index) => (
                <div 
                  key={index}
                  className="p-4 border border-emerald-500/20 rounded-md bg-black/20"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-emerald-400 font-medium">Item {index + 1}</h4>
                    <button
                      onClick={() => {
                        const newArray = [...value];
                        newArray.splice(index, 1);
                        onChange(path, fieldKey, newArray);
                      }}
                      className="text-red-400 hover:text-red-300"
                    >
                      Remove
                    </button>
                  </div>
                  {typeof item === 'object' && item !== null ? (
                    <div className="space-y-3">
                      {Object.entries(item).map(([itemKey, itemValue]) => (
                        <div key={itemKey} className="space-y-1">
                          <label className="block text-sm font-medium text-gray-300">
                            {itemKey.charAt(0).toUpperCase() + itemKey.slice(1)}
                          </label>
                          {renderField(itemKey, itemValue, [...currentPath, index])}
                        </div>
                      ))}
                    </div>
                  ) : (
                    renderField(index, item, path.concat([fieldKey]))
                  )}
                </div>
              ))}
              
              <button
                onClick={() => {
                  // Determine type for new item based on existing items
                  let newItem;
                  
                  if (value.length > 0) {
                    const lastItem = value[value.length - 1];
                    if (typeof lastItem === 'string') {
                      newItem = '';
                    } else if (typeof lastItem === 'number') {
                      newItem = 0;
                    } else if (typeof lastItem === 'boolean') {
                      newItem = false;
                    } else if (Array.isArray(lastItem)) {
                      newItem = [];
                    } else if (typeof lastItem === 'object' && lastItem !== null) {
                      // Clone the structure of the last object
                      newItem = Object.keys(lastItem).reduce((acc, key) => {
                        const val = lastItem[key];
                        if (typeof val === 'string') acc[key] = '';
                        else if (typeof val === 'number') acc[key] = 0;
                        else if (typeof val === 'boolean') acc[key] = false;
                        else if (Array.isArray(val)) acc[key] = [];
                        else if (typeof val === 'object' && val !== null) acc[key] = {};
                        else acc[key] = null;
                        return acc;
                      }, {});
                    } else {
                      newItem = null;
                    }
                  } else {
                    // Default to empty string for empty arrays
                    newItem = '';
                  }
                  
                  onChange(path, fieldKey, [...value, newItem]);
                }}
                className="w-full py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-md"
              >
                Add Item
              </button>
            </div>
          );
        }
        
        // Handle objects (non-array)
        return (
          <div className="space-y-4">
            {Object.entries(value).map(([objKey, objValue]) => (
              <div key={objKey} className="space-y-1">
                <label className="block text-sm font-medium text-gray-300">
                  {objKey.charAt(0).toUpperCase() + objKey.slice(1)}
                </label>
                {renderField(objKey, objValue, currentPath)}
              </div>
            ))}
          </div>
        );
      
      default:
        return <p className="text-red-400">Unsupported field type</p>;
    }
  };

  // For top-level sections, render fields directly
  const renderSection = () => {
    if (!content || typeof content !== 'object') {
      return <p className="text-red-400">No editable content available for this section</p>;
    }

    // Special case for navigation
    if (section === 'navLinks' && Array.isArray(content)) {
      return (
        <>
          <h3 className="text-xl font-bold text-white mb-6">Navigation Links</h3>
          <div className="space-y-4">
            {content.map((item, index) => (
              <div 
                key={index}
                className="p-4 border border-emerald-500/20 rounded-md bg-black/20"
              >
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-emerald-400 font-medium">Link {index + 1}</h4>
                  <button
                    onClick={() => {
                      const newArray = [...content];
                      newArray.splice(index, 1);
                      onChange([], newArray);
                    }}
                    className="text-red-400 hover:text-red-300"
                  >
                    Remove
                  </button>
                </div>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-300">Name</label>
                    <input
                      type="text"
                      value={item.name || ''}
                      onChange={(e) => {
                        const newArray = [...content];
                        newArray[index].name = e.target.value;
                        onChange([], newArray);
                      }}
                      className="w-full px-3 py-2 bg-black/40 border border-emerald-500/20 rounded-md text-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-300">Link (href)</label>
                    <input
                      type="text"
                      value={item.href || ''}
                      onChange={(e) => {
                        const newArray = [...content];
                        newArray[index].href = e.target.value;
                        onChange([], newArray);
                      }}
                      className="w-full px-3 py-2 bg-black/40 border border-emerald-500/20 rounded-md text-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>
            ))}
            
            <button
              onClick={() => {
                onChange([], [...content, { name: 'New Link', href: '#' }]);
              }}
              className="w-full py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-md"
            >
              Add Navigation Link
            </button>
          </div>
        </>
      );
    }

    return (
      <>
        <h3 className="text-xl font-bold text-white mb-6">
          {section.charAt(0).toUpperCase() + section.slice(1)} Content
        </h3>
        <div className="space-y-6">
          {Object.entries(content).map(([key, value]) => (
            <div key={key} className="space-y-1">
              <label className="block text-sm font-medium text-gray-300">
                {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
              </label>
              {renderField(key, value)}
            </div>
          ))}
        </div>
      </>
    );
  };

  return <div>{renderSection()}</div>;
};

export default EditableContent;