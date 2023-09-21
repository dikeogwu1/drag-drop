import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { SortableItem } from "./SortableItem";
import Search from "../../components/Search";
import Loading from "../../components/Loading";
import "../../styles/draggable.css";
import useLogger from "../../utils/hooks/useLogger";

function Draggable() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { error: unauthorized, data: authorized } = useLogger(
    "https://hngx-image-server.onrender.com/api/v1/drag"
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // fetch images from the server
  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://hngx-image-server.onrender.com/api/v1/image"
      );
      setLoading(false);
      setItems(data.image);
    } catch (error) {
      setItems([]);
      setLoading(false);
      setError(true);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // loading state
  if (loading) {
    return (
      <main className='loading-centered'>
        <Search items={items} setItems={setItems} />
        <div className='wrapper'>
          <Loading />
        </div>
      </main>
    );
  }
  // error state
  if (error) {
    return (
      <main className='wrapper'>
        <h2>{error}</h2>
      </main>
    );
  }
  // No search match
  if (items.length < 1) {
    return (
      <main className='loading-centered'>
        <Search items={items} setItems={setItems} />
        <div className='wrapper'>
          <h2>No collection matches your search</h2>
        </div>
      </main>
    );
  }
  // Drag and drop
  return (
    <main className='loading-centered'>
      <Search items={items} setItems={setItems} />
      <div className='draggable'>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {items.map((item) => (
              <SortableItem key={item._id} item={item} />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </main>
  );

  // handle drag and drop event
  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id && authorized.length > 0) {
      console.log(authorized);
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item._id === active.id);
        const newIndex = items.findIndex((item) => item._id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    } else {
      return alert("Login to access this feature");
    }
  }
}
export default Draggable;
